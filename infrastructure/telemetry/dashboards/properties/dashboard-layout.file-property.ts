import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type DashboardLayout = "json"

export const dashboardLayout = {
  id: "01a07c67-99f2-750d-ba7b-7eb5c1950ed1",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "dashboard-layout",
  propertySlug: "layout",
  definition: "the panels and queries a dashboard draws",
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A layout is the JSON a chart server reads.",
    },
    {
      invariantKind: "departure",
      statement: "A chart server writes this JSON rather than an author.",
    },
    {
      invariantKind: "departure",
      statement: "The byte ceiling is not judged over a layout.",
    },
  ],
} as const satisfies FileProperty
