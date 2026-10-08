import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const archiveOfWorldsWebHome = {
  id: "01a0e2a2-1ed8-7e8a-9edd-9c805b89e7d7",
  type: "page-type/site-document",
  slug: "archive-of-worlds-web-home",
  title: "Archive of Worlds",
  description:
    "Your content will appear here as it is added. Use the sidebar to navigate between collections once they exist.",
  webApp: "web-app/archive-of-worlds-web",
  urlPath: "",
  lead: "Welcome to your Archive of Worlds.",
  createdAt: "2026-09-27T11:31:10.680Z",
  updatedAt: "2026-09-27T11:42:07.000Z",
} as const satisfies SiteDocument
