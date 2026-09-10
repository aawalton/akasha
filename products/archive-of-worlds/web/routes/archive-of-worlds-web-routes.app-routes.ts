import type { AppRoutes } from "../../../../code-system/app-routes/app-routes.page-type.types.ts"

export const archiveOfWorldsWebRoutes = {
  id: "01a08be4-f999-7d6f-9463-5023ae3c936a",
  pageTypeSlug: "app-routes",
  type: "app-routes",
  slug: "archive-of-worlds-web-routes",
  definition: "the routes archiveofworlds.app serves",
  appLayout: "tsx",
  parts: [
    "route/archive-of-worlds-api-errors",
    "route/archive-of-worlds-api-health",
    "route/archive-of-worlds-api-live-version",
    "route/archive-of-worlds-api-page-types",
    "route/archive-of-worlds-sign-out",
    "route/archive-of-worlds-home",
    "route/archive-of-worlds-sign-in",
    "route/archive-of-worlds-sign-up",
    "route/archive-of-worlds-api-page-write",
    "route/archive-of-worlds-page-listing",
    "route/archive-of-worlds-page-detail",
    "route/archive-of-worlds-api-pages",
    "route/archive-of-worlds-api-nav-icon",
  ],
} as const satisfies AppRoutes
