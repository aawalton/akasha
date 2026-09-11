import type { AppRoutes } from "akasha/code-system/app-routes/app-routes.page-type.types.ts"

export const audhdalanWebRoutes = {
  id: "01a08bdf-ff09-7348-bca5-28dcbe2f36ee",
  pageTypeSlug: "app-routes",
  type: "app-routes",
  slug: "audhdalan-web-routes",
  definition: "the routes audhdalan.com serves",
  parts: [
    "route/audhdalan-home",
    "route/audhdalan-autcon-2026",
    "route/audhdalan-safety-levels",
    "route/audhdalan-api-health",
    "route/audhdalan-api-errors",
    "route/audhdalan-api-subscribe",
  ],
} as const satisfies AppRoutes
