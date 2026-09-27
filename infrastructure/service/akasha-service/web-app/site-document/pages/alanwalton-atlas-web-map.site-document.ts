import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonAtlasWebMap = {
  id: "01a0e2d5-4306-7d11-8493-4f1f8af734ca",
  type: "page-type/site-document",
  slug: "alanwalton-atlas-web-map",
  title: "Map",
  webApp: "web-app/alanwalton-atlas-web",
  urlPath: "map",
} as const satisfies SiteDocument
