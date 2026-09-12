import type { AppRoutes } from "akasha/code/app-routes/app-routes.page-type.types.ts"

export const audhdalanWebRoutes = {
  id: "01a08bdf-ff09-7348-bca5-28dcbe2f36ee",
  type: "app-routes",
  slug: "audhdalan-web-routes",
  definition: "the routes audhdalan.com serves",
  parts: [
    "route/audhdalan-api-health",
    "route/audhdalan-autcon-2026",
    "route/audhdalan-home",
    "route/audhdalan-api-errors",
    "route/audhdalan-api-subscribe",
    "route/audhdalan-safety-levels",
  ],
} as const satisfies AppRoutes
