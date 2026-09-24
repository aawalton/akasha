import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebServices = {
  id: "01a0d5b4-244e-792c-bdfb-b9266035d384",
  type: "page-type/site-document",
  slug: "alanwalton-web-services",
  title: "Services",
  description:
    "The Amy personal-assistant messaging service — two-way SMS for scheduling, reminders, and coordination.",
  webApp: "web-app/alanwalton-web",
  urlPath: "services",
  lead: "The service Alan Walton offers is a personal-assistant text line, branded **Amy**.",
  sections: [
    {
      anchor: "assistant-messaging",
      title: "Personal-assistant messaging (Amy)",
      lead: "Two-way texts for scheduling, reminders, and coordination.",
      text: "Amy sends conversational, transactional text messages on Alan Walton’s behalf to coordinate with the people he works with — scheduling, reminders, and day-to-day coordination. It is not a marketing service and not a bulk-messaging service.",
    },
    {
      anchor: "consent",
      title: "Consent-based, written opt-in",
      text: "Recipients gave explicit prior written consent to receive these messages. Consent is given through the public opt-in form at [alanwalton.com/sms](/sms), and no one is added without first giving that prior consent.",
    },
    {
      anchor: "details",
      title: "Message frequency and rates",
      text: "Message frequency is low and varies — approximately 100 messages per month. Message and data rates may apply. Reply **STOP** at any time to opt out, or **HELP** for help. Full messaging terms, consent, and privacy details are published at [alanwalton.com/sms](/sms).",
    },
  ],
} as const satisfies SiteDocument
