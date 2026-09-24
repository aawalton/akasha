import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebSms = {
  id: "01a0d5b4-244e-7435-bbe2-618c77f42256",
  type: "page-type/site-document",
  slug: "alanwalton-web-sms",
  title: "Amy — Messaging Terms, Consent & Privacy",
  description:
    "Consent, opt-out, and privacy terms for Amy, the personal assistant messaging service of Alan Walton.",
  webApp: "web-app/alanwalton-web",
  urlPath: "sms",
  lead: "Amy is the personal assistant messaging service of Alan Walton. This page describes how the service uses SMS text messaging, how recipients consent and opt out, and how message data is handled.",
  sections: [
    {
      anchor: "who",
      title: "Who we are",
      text: "Amy is the personal assistant messaging service of Alan Walton. Messages are sent on Alan Walton’s behalf to coordinate with the people he works and communicates with.",
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
      text: "Recipients give explicit prior consent before any message is sent. Consent is given in writing, through the **digital opt-in form below**, and no number is added without that prior consent.",
    },
    {
      anchor: "opt-in",
      title: "Opt in to messages",
      text: "To receive text messages from Amy, enter your name and mobile number and check the consent box below. This records your written consent. You can reply **STOP** at any time to opt out.",
    },
    {
      anchor: "opt-in-workflow",
      title: "Opt-In Workflow",
      text: "**Opt-in method:** Explicit written consent, given through the public digital opt-in form on this page (the “Opt in to messages” section above). Messaging is limited to the owner and people who have given that explicit consent.\n\n### How consent is obtained\n\n1. **Digital form:** a visitor enters their name and mobile number and checks the consent box in the opt-in form above; their written consent is recorded with a timestamp.\n2. The same terms are published at alanwalton.com/sms.\n3. Only after the person consents is their number added; the consent is recorded.\n\n### Disclaimers provided before the first message\n\n- Sender identity: Alan Walton’s assistant, “Amy”.\n- Purpose: scheduling, reminders, and coordination — not marketing, not bulk.\n- Frequency: approximately 100 messages per month.\n- “Message and data rates may apply.”\n- Opt-out: reply **STOP** to stop, **HELP** for help.\n- Privacy: numbers and message content are used only to provide the service and are not sold or shared with third parties.",
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
      text: "The data collected is the phone numbers and message content exchanged with the service. This data is used only to provide the personal assistant messaging service. It is not sold and not shared with third parties.\n\nWhen you submit the digital opt-in form on this page, we record your name, mobile number, the fact and text of your consent, a timestamp, and your IP address and browser user-agent. This information is kept as proof that you consented to receive messages. It is used only to operate the service and is not sold or shared with third parties.\n\nPhone numbers and message content are retained only as long as needed to provide the service and are handled with reasonable care to keep them private.",
    },
    {
      anchor: "contact",
      title: "Contact",
      text: "Questions about this service or these terms? Contact [alan@alanwalton.com](mailto:alan@alanwalton.com).",
    },
  ],
} as const satisfies SiteDocument
