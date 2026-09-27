import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonWebHome = {
  id: "01a0e2a9-c5be-7df0-9697-1e226d312674",
  type: "page-type/site-document",
  slug: "alanwalton-web-home",
  title: "Home",
  webApp: "web-app/alanwalton-web",
  urlPath: "home",
} as const satisfies SiteDocument
