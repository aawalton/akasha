import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const viewSorts = {
  id: "01a0680d-4d00-7004-a139-6e5c8b2f4105",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "view-sorts",
  propertySlug: "view-sorts",
  definition: "the keys a view orders its pages by, each with the way it runs",
  properties: [
    { pageProperty: "text-property/sort-key", required: true, many: false },
    { pageProperty: "boolean-property/sort-descending", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keys are weighed in the order the keys are stated.",
    },
    {
      invariantKind: "departure",
      statement: "A view stating no key draws in whatever order the pages arrive.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
