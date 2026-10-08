import type { Dashboard } from "akasha/infrastructure/telemetry/dashboard/dashboard.page-type.types.ts"

export const resources = {
  id: "01a07c67-dac9-7ae2-9960-cb335b620562",
  type: "page-type/dashboard",
  slug: "resources",
  definition: "what a chart server draws over the cluster's resources",
  layout: "json",
  createdAt: "2026-09-07T15:06:16.137Z",
  updatedAt: "2026-09-15T17:07:05.000Z",
} as const satisfies Dashboard
