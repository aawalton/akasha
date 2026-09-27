import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonAtlasWebHome = {
  id: "01a0e2a5-7b74-79a7-99e3-601d7924c365",
  type: "page-type/site-document",
  slug: "alanwalton-atlas-web-home",
  title: "Atlas",
  description:
    "Your content will appear here as it is added. Use the sidebar to navigate between collections once they exist.",
  webApp: "web-app/alanwalton-atlas-web",
  urlPath: "",
  lead: "Welcome to your Atlas.",
} as const satisfies SiteDocument
