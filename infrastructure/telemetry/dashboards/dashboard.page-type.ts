import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { DashboardLayout } from "./properties/dashboard-layout.file-property.ts"

export type Dashboard = Domain & {
  layout: DashboardLayout
}

export const dashboard = {
  id: "01a07c67-a724-7337-8adc-5a5e3a393057",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "dashboard",
  definition: "what a chart server draws over one subject",
  pluralSlug: "dashboards",
  parts: ["file-property/dashboard-layout"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "file-property/dashboard-layout", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dashboard is one page and one layout file.",
    },
    {
      invariantKind: "departure",
      statement: "A dashboard is found by its page type rather than by its file name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest inlines a dashboard rather than a chart server fetching that dashboard.",
    },
  ],
} as const satisfies PageType
