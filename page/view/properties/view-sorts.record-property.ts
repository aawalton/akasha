import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const viewSorts = {
  id: "01a0680d-4d00-7004-a139-6e5c8b2f4105",
  type: "page-type/record-property",
  slug: "view-sorts",
  propertySlug: "view-sorts",
  definition: "the keys a view orders its pages by, each with the way it runs",
  properties: [
    { pageProperty: "text-property/sort-key", required: true, many: false },
    { pageProperty: "boolean-property/sort-descending", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys are weighed in the order the keys are stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view stating no key draws in whatever order the pages arrive.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:14:57.280Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RecordProperty
