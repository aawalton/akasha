import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const request = {
  id: "01a0542c-d18b-71bb-99a6-64c5edfe6321",
  type: "page-type/record-property",
  slug: "request",
  propertySlug: "request",
  definition: "the work that waits for a seat's supervisor",
  properties: [
    { pageProperty: "relation-property/requested-action", required: true, many: false },
    { pageProperty: "text-property/interrupt-message", required: false, many: false },
    { pageProperty: "instant-property/restart-armed-at", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat has one request or no request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new request takes the place of any request already there.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
