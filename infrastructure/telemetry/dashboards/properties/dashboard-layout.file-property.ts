import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const dashboardLayout = {
  id: "01a07c67-99f2-750d-ba7b-7eb5c1950ed1",
  type: "file-property",
  slug: "dashboard-layout",
  propertySlug: "layout",
  definition: "the panels and queries a dashboard draws",
  extensions: ["json"],
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
  types: "ts",
} as const satisfies FileProperty
