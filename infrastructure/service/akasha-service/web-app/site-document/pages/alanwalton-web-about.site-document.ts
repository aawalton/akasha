import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebAbout = {
  id: "01a0d5b4-244d-7472-b127-0bab532e4503",
  type: "page-type/site-document",
  slug: "alanwalton-web-about",
  title: "About",
  description:
    "About Alan Walton, sole proprietor, and the Amy personal-assistant messaging service.",
  webApp: "web-app/alanwalton-web",
  urlPath: "about",
  lead: "Alan Walton is a sole proprietor operating a personal-assistant service.",
  sections: [
    {
      anchor: "who",
      title: "Who we are",
      text: "The business is Alan Walton, operating as a sole proprietor. Its personal-assistant service — branded **Amy** — sends text messages on Alan Walton’s behalf to coordinate with the people he works and communicates with.",
    },
    {
      anchor: "what",
      title: "What we do",
      lead: "Two-way texts for scheduling, reminders, and coordination.",
      text: "Messages are conversational and transactional — scheduling, reminders, and day-to-day coordination with people who have opted in. This is not a marketing service and not a bulk-messaging service.",
    },
  ],
} as const satisfies SiteDocument
