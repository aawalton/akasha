import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const locationConditions = {
  id: "01a0c645-074c-72ea-9eb7-28ffdb438ce9",
  type: "page-type/record-property",
  slug: "location-conditions",
  propertySlug: "conditions",
  definition: "what is so of a place that bears on what can be done there",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "text-property/listed-note", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The light and the water in a place are two conditions rather than two properties.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The conditions a game reads are its own rather than one list.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
