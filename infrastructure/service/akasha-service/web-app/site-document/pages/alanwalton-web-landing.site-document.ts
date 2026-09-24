import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebLanding = {
  id: "01a0d5b4-244e-7cae-b50b-9d233d6a6511",
  type: "page-type/site-document",
  slug: "alanwalton-web-landing",
  title: "Alan Walton",
  description:
    "Alan Walton — sole proprietor operating a personal-assistant service, including the Amy SMS text line for scheduling, reminders, and coordination.",
  webApp: "web-app/alanwalton-web",
  urlPath: "",
  lead: "Alan Walton is a sole proprietor operating a personal-assistant service. The service includes **Amy**, an SMS text line used for scheduling, reminders, and day-to-day coordination with the people he works with.",
  sections: [
    {
      anchor: "what-we-do",
      title: "What we do",
      lead: "A personal-assistant service for scheduling, reminders, and coordination.",
      text: "Amy sends two-way, conversational text messages on Alan Walton’s behalf to coordinate with people who have opted in. It is not a marketing service and not a bulk-messaging service.",
    },
    {
      anchor: "more",
      title: "More information",
      text: "- [About](/about)\n- [Services](/services)\n- [Messaging & SMS opt-in](/sms)\n- [Contact](/contact)\n- [Privacy](/privacy)\n- [Terms](/terms)",
    },
  ],
} as const satisfies SiteDocument
