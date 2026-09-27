import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonAtlasWebSearch = {
  id: "01a0e2d6-e63b-77de-b911-a7479d3c3c56",
  type: "page-type/site-document",
  slug: "alanwalton-atlas-web-search",
  title: "Search places",
  webApp: "web-app/alanwalton-atlas-web",
  urlPath: "search",
} as const satisfies SiteDocument
