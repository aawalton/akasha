import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const alanwaltonRequestsWebHome = {
  id: "01a0e2ca-31d9-76f4-b265-0140ed5de783",
  type: "page-type/site-document",
  slug: "alanwalton-requests-web-home",
  title: "Requests Live Check",
  description: "What people have asked Alan to build, and the points behind each ask.",
  webApp: "web-app/alanwalton-requests-web",
  urlPath: "",
} as const satisfies SiteDocument
