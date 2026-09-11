import type { RecordProperty } from "../../record-properties/record-property.page-type.types.ts"

export const sequence = {
  id: "01a062de-2001-7000-bc0f-0dd4d369ec1b",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "sequence",
  propertySlug: "sequence",
  definition: "how a page type's pages are grouped and ordered when one is read after another",
  properties: [
    { pageProperty: "text-property/sequence-group-by", required: true, many: false },
    { pageProperty: "text-property/sequence-order-by", required: true, many: false },
    { pageProperty: "text-property/sequence-direction", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type states here how its pages are grouped and ordered into a run.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating no sequence takes the sequence the page type above states.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no sequence here or above stands in no run.",
    },
    {
      invariantKind: "departure",
      statement: "Pages with one value under the grouping key stand in one run.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
