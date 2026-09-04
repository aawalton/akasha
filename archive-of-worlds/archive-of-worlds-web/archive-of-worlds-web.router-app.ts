import type { RouterApp } from "../../code-system/router-apps/router-app.page-type.ts"

export const archiveOfWorldsWeb = {
  id: "01a06582-2737-7abe-a512-ecb40685ecf4",
  pageTypeSlug: "router-app",
  slug: "archive-of-worlds-web",
  definition: "the routes archiveofworlds.app serves to a browser",
  manifest: "json",
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  routerConfig: "ts",
  partSlugs: [
    "stylesheet/archive-of-worlds-web-look",
    "module/archive-of-worlds-app-id",
    "module/archive-of-worlds-app-shell",
    "module/archive-of-worlds-auth-provider",
    "module/archive-of-worlds-nav-commands",
    "module/archive-of-worlds-nav-items",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The four answers a browser asks for about pages come from web-page-answers.",
    },
  ],
} as const satisfies RouterApp
