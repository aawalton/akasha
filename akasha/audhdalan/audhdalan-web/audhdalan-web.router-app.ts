import type { RouterApp } from "../../code-system/router-apps/router-app.page-type.ts"

export const audhdalanWeb = {
  id: "01a06558-c2cc-7008-82aa-ce6fcd6a0c2a",
  pageTypeSlug: "router-app",
  slug: "audhdalan-web",
  definition: "the routes audhdalan.com serves to a browser",
  manifest: "json",
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
  partSlugs: [
    "stylesheet/audhdalan-web-look",
    "module/deck-page-content",
    "module/deck-slides",
    "module/resource-list",
    "module/subscribe-form",
  ],
} as const satisfies RouterApp
