import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebPrivacy = {
  id: "01a0d5b4-244e-74b4-ae00-843ddef52402",
  type: "page-type/site-document",
  slug: "alanwalton-web-privacy",
  title: "Privacy Policy",
  description: "Privacy policy for Alan Walton and the Amy personal-assistant messaging service.",
  webApp: "web-app/alanwalton-web",
  urlPath: "privacy",
  lead: "How the Amy personal-assistant messaging service, operated by Alan Walton, handles message data.",
  sections: [
    {
      anchor: "data",
      title: "What we collect and how we use it",
      text: "The data collected is the phone numbers and message content exchanged with the service. This data is used only to provide the personal-assistant messaging service. It is not sold and not shared with third parties. No mobile information will be sold or shared with third parties for promotional or marketing purposes.\n\nWhen you submit the digital opt-in form at [alanwalton.com/sms](/sms), we record your name, mobile number, the fact of your consent, the version of the consent wording shown to you, a timestamp, and your IP address and browser user-agent. This information is kept as proof that you consented to receive messages. It is used only to operate the service and is not sold or shared with third parties.",
    },
    {
      anchor: "retention",
      title: "Retention",
      text: "Phone numbers and message content are retained only as long as needed to provide the service and are handled with reasonable care to keep them private.",
    },
    {
      anchor: "contact",
      title: "Questions",
      text: "Questions about this policy or the service? Contact [alan@alanwalton.com](mailto:alan@alanwalton.com). Full messaging terms and consent details are at [alanwalton.com/sms](/sms).",
    },
  ],
} as const satisfies SiteDocument
