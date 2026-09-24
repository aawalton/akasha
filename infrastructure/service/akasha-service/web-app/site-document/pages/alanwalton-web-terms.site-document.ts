import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebTerms = {
  id: "01a0d5ab-cd7e-704a-8836-df584c5a49e2",
  type: "page-type/site-document",
  slug: "alanwalton-web-terms",
  title: "Terms",
  description: "Terms for the Amy personal-assistant messaging service, operated by Alan Walton.",
  webApp: "web-app/alanwalton-web",
  urlPath: "terms",
  lead: "Terms for the Amy personal-assistant messaging service, operated by Alan Walton.",
  sections: [
    {
      anchor: "who",
      title: "Who we are",
      text: "Amy is the personal-assistant messaging service of Alan Walton, a sole proprietor. Messages are sent on Alan Walton’s behalf to coordinate with the people he works and communicates with.",
    },
    {
      anchor: "what",
      title: "What the messages are",
      lead: "Two-way texts for scheduling, reminders, and coordination.",
      text: "Messages are conversational and transactional — scheduling, reminders, and day-to-day coordination. This is not a marketing service and not a bulk-messaging service.",
    },
    {
      anchor: "consent",
      title: "Consent & opt-in",
      text: "Recipients gave explicit prior written consent to receive these messages. Consent is given through the public opt-in form at [alanwalton.com/sms](/sms), and no one is added without first giving that prior consent.",
    },
    {
      anchor: "opt-out",
      title: "Opt-out & help",
      lead: "Reply STOP to stop; reply HELP for help/contact.",
      text: "You can opt out of messages at any time by replying **STOP**. Reply **HELP** for help or contact information.",
    },
    {
      anchor: "frequency",
      title: "Message frequency",
      text: "Message frequency is low and varies — approximately 100 messages per month.",
    },
    {
      anchor: "rates",
      title: "Rates",
      text: "Message and data rates may apply.",
    },
    {
      anchor: "privacy",
      title: "Privacy",
      text: "Phone numbers and message content are used only to provide the service and are not sold or shared with third parties. No mobile information will be sold or shared with third parties for promotional or marketing purposes. See the full [Privacy Policy](/privacy).",
    },
  ],
} as const satisfies SiteDocument
