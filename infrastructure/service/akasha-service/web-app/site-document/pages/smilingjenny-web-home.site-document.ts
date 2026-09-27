import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const smilingjennyWebHome = {
  id: "01a0e2a7-403d-7608-8ac7-8516f3e7c036",
  type: "page-type/site-document",
  slug: "smilingjenny-web-home",
  title: "Smiling Jenny",
  webApp: "web-app/smilingjenny-web",
  urlPath: "",
  lead: "Signed in (live check)",
} as const satisfies SiteDocument
