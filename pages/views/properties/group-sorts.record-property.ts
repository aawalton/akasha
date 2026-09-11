import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const groupSorts = {
  id: "01a0680d-4d00-7008-a715-4d2b9c8e4109",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "group-sorts",
  propertySlug: "group-sorts",
  definition: "the keys a view orders its groups by, each with the way it runs",
  properties: [
    { pageProperty: "text-property/sort-key", required: true, many: false },
    { pageProperty: "boolean-property/sort-descending", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a view gathering its pages orders its groups.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
