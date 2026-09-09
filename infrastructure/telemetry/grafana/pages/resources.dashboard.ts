import type { Dashboard } from "../../dashboards/dashboard.page-type.ts"

export const resources = {
  id: "01a07c67-dac9-7ae2-9960-cb335b620562",
  pageTypeSlug: "dashboard",
  type: "dashboard",
  slug: "resources",
  definition: "what a chart server draws over the cluster's resources",
  layout: "json",
} as const satisfies Dashboard
