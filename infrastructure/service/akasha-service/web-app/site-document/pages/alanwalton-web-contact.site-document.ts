import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebContact = {
  id: "01a0d5b4-244e-7a0f-a866-cd877430b68b",
  type: "page-type/site-document",
  slug: "alanwalton-web-contact",
  title: "Contact",
  description: "Contact Alan Walton — email and business address.",
  webApp: "web-app/alanwalton-web",
  urlPath: "contact",
  lead: "Reach Alan Walton by email, or write to the business address below.",
  sections: [
    {
      anchor: "contact",
      title: "Contact information",
      text: "- Email: [alan@alanwalton.com](mailto:alan@alanwalton.com)\n- Business address: 1350 Apple Ave, Provo, UT 84604",
    },
    {
      anchor: "messaging",
      title: "Messaging opt-out",
      text: "If you receive texts from the Amy assistant line, reply **STOP** at any time to opt out, or **HELP** for help. Full messaging terms and privacy details are at [alanwalton.com/sms](/sms).",
    },
  ],
} as const satisfies SiteDocument
