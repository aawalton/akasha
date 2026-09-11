import type { Dashboard } from "akasha/infrastructure/telemetry/dashboards/dashboard.page-type.types.ts"

export const database = {
  id: "01a07c67-b40e-77da-a23f-d6c6c7121707",
  type: "dashboard",
  slug: "database",
  definition: "what a chart server draws over the database",
  layout: "json",
} as const satisfies Dashboard
