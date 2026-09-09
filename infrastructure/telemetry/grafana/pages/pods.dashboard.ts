import type { Dashboard } from "../../dashboards/dashboard.page-type.ts"

export const pods = {
  id: "01a07c67-c792-7942-ba2f-031531a70cfa",
  pageTypeSlug: "dashboard",
  type: "dashboard",
  slug: "pods",
  definition: "what a chart server draws over the pods",
  layout: "json",
} as const satisfies Dashboard
