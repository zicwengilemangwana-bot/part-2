const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach(img => {
    img.addEventListener("click", function() {
        lightbox.style.display = "block";
         const fullImgSrc = this.getAttribute("data-full");
         lightboxImg.setAttribute("src", fullImgSrc);
    });
});

closeBtn.addEventListener("click", function() {
    lightbox.style.display = "none";
});
    document.getElementById("search").addEventListener("keyup", function() {
        const query = this.value.toLowerCase();
        const serviceItems = document.querySelectorAll(".service-item");

        serviceItems.forEach(item => {
            const title = item.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query)) {
                item.style.display = "block"; // Show matching services
                item.classList.add("highlight"); // Optional: add highlight class
            } else {
                item.style.display = "none"; // Hide non-matching services
                item.classList.remove("highlight"); // Remove highlight class
            }
        });
    });
    // Lightbox functionality
function openLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const captionText = document.getElementById('lightbox-caption');
  
  lightbox.style.display = 'flex';
  lightboxImg.src = imgSrc;
  captionText.innerHTML = caption;
  
  // Prevent scrolling when lightbox is open
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});
// Services filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterInput = document.getElementById('service-filter');
  
  if (filterInput) {
    filterInput.addEventListener('keyup', function() {
      const filterValue = this.value.toLowerCase();
      const serviceCards = document.querySelectorAll('.service-card');
      
      serviceCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();
        
        if (title.includes(filterValue) || 
            description.includes(filterValue) || 
            category.includes(filterValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
// Enquiry Form processing
document.addEventListener('DOMContentLoaded', function() {
  const enquiryForm = document.getElementById('enquiry-form');
  const responseArea = document.getElementById('response-message');
  
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      const budget = document.getElementById('budget').value;
      const message = document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !service || !budget || !message) {
        responseArea.innerHTML = '<div class="error">Please fill in all required fields.</div>';
        responseArea.classList.remove('hidden');
        return;
      }
      
      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        responseArea.innerHTML = '<div class="error">Please enter a valid email address.</div>';
        responseArea.classList.remove('hidden');
        return;
      }
      
      // Generate a quote based on service and budget
      let estimatedTime = '';
      switch(service) {
        case 'web-design':
          estimatedTime = '2-3 weeks';
          break;
        case 'web-development':
          estimatedTime = '4-6 weeks';
          break;
        case 'seo':
          estimatedTime = '1-2 months (ongoing)';
          break;
        default:
          estimatedTime = 'To be determined';
      }
      
      // Display response
      responseArea.innerHTML = `
        <div class="success">
          <h3>Thank you for your enquiry, ${name}!</h3>
          <p>We've received your request for <strong>${document.getElementById('service').options[document.getElementById('service').selectedIndex].text}</strong> services.</p>
          <p>Based on your budget of ZAR ${budget} and project requirements, we estimate the project will take approximately <strong>${estimatedTime}</strong>.</p>
          <p>One of our representatives will contact you at ${email} within 24 hours to discuss your project in detail.</p>
        </div>
      `;
      responseArea.classList.remove('hidden');
      
      // Reset form
      enquiryForm.reset();
    });
  }
});
// Contact form handling with Formspree
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const contactResponse = document.getElementById('contact-response');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Don't prevent default here as we want the form to submit to Formspree
      
      // Show sending message
      contactResponse.innerHTML = '<div class="info">Sending your message...</div>';
      contactResponse.classList.remove('hidden');
      
      // We'll add a success message after form submission
      // Formspree will handle the actual form submission
    });
    
    // Check for query parameters on page load (Formspree redirects back with these)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
      contactResponse.innerHTML = '<div class="success">Your message has been sent successfully! We will get back to you soon.</div>';
      contactResponse.classList.remove('hidden');
    }
  }
});