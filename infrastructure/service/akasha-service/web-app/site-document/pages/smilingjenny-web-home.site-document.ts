import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const smilingjennyWebHome = {
  id: "01a0e2a7-403d-7608-8ac7-8516f3e7c036",
  type: "page-type/site-document",
  slug: "smilingjenny-web-home",
  title: "Smiling Jenny",
  description: "What the system holds.",
  webApp: "web-app/smilingjenny-web",
  urlPath: "",
  lead: "Signed in",
  sections: [
    {
      anchor: "not-found",
      title: "Nothing here",
      text: "This address does not lead anywhere. If you followed a link from a message, try opening it again.",
    },
    {
      anchor: "not-yours",
      title: "Not yours",
      text: "This site is Jenny's, and you are signed in as somebody else.",
    },
    {
      anchor: "went-wrong",
      title: "Something went wrong",
    },
  ],
  createdAt: "2026-09-27T11:36:46.909Z",
  updatedAt: "2026-09-27T14:05:15.000Z",
} as const satisfies SiteDocument
