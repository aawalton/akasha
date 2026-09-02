import type { RouterApp } from "../../code-system/router-apps/router-app.page-type.ts"

export const temperWeb = {
  id: "01a06401-38c0-764d-a6a9-adb737874f4b",
  pageTypeSlug: "router-app",
  slug: "temper-web",
  definition: "the routes Temper serves to a browser",
  manifest: "json",
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
} as const satisfies RouterApp
