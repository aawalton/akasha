import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const placeExits = {
  id: "01a0d42f-0689-7bf1-96eb-c0c92d2ccd82",
  type: "page-type/record-property",
  slug: "place-exits",
  propertySlug: "exits",
  definition: "a way out of a place",
  properties: [
    { pageProperty: "relation-property/place-exit-to", required: false, many: false },
    { pageProperty: "text-property/place-exit-way", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit to a place with no page yet names no place.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
