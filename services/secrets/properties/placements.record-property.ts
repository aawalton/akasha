import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const placements = {
  id: "01a0765c-3223-7d78-a54c-e8653b46a958",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "placements",
  propertySlug: "placements",
  definition: "the resources a secret's value is put into, and the key it sits under in each",
  properties: [
    { pageProperty: "text-property/resource-name", required: true, many: false },
    { pageProperty: "text-property/resource-key", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One value wanted in two resources is one page naming two placements.",
    },
    {
      invariantKind: "departure",
      statement: "A placement says where a value goes rather than holding the value.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no placement puts its value nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "Two placements naming one resource and one key are one placement written twice.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
