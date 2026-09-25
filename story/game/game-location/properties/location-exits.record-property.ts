import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const locationExits = {
  id: "01a0d936-f975-7b12-97ae-9c09bb49f45e",
  type: "page-type/record-property",
  slug: "location-exits",
  propertySlug: "exits",
  definition: "a way out of a location",
  properties: [
    { pageProperty: "relation-property/location-exit-to", required: false, many: false },
    { pageProperty: "text-property/location-exit-way", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit to a location with no page yet names no location.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exit reaching a location with a page names that location rather than describing it.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
