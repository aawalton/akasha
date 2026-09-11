import type { AppRoutes } from "akasha/code-system/app-routes/app-routes.page-type.types.ts"

export const smilingjennyWebRoutes = {
  id: "01a08be0-c736-78bf-a742-a76759c4c2a4",
  type: "app-routes",
  slug: "smilingjenny-web-routes",
  definition: "the routes Jenny's site serves",
  parts: [
    "route/jenny-categorization",
    "route/jenny-cost",
    "route/jenny-readout-relay",
    "route/jenny-safety-level",
    "route/jenny-surplus",
    "route/jenny-upkeep",
    "route/jenny-api-health",
    "route/jenny-api-live-version",
    "route/jenny-api-errors",
    "route/jenny-api-push-register",
    "route/jenny-sign-out",
    "route/jenny-sign-in",
    "route/jenny-home",
  ],
} as const satisfies AppRoutes
