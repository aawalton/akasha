import type { AppRoutes } from "akasha/code/app-routes/app-routes.page-type.types.ts"

export const alanRequestsWebRoutes = {
  id: "01a0c537-ba5e-7546-95ed-67b34921782e",
  type: "page-type/app-routes",
  slug: "alan-requests-web-routes",
  definition: "the routes the Requests site serves",
  appLayout: "tsx",
  parts: [
    "route/requests-api-errors",
    "route/requests-api-health",
    "route/requests-api-live-version",
    "route/requests-api-nav-icon",
    "route/requests-api-page-types",
    "route/requests-api-page-write",
    "route/requests-api-pages",
    "route/requests-handover",
    "route/requests-home",
    "route/requests-page-detail",
    "route/requests-page-listing",
    "route/requests-sign-in",
    "route/requests-sign-out",
    "route/requests-sign-up",
    "route/requests-api-requests",
  ],
} as const satisfies AppRoutes
