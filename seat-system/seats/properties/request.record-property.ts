import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const request = {
  id: "01a0542c-d18b-71bb-99a6-64c5edfe6321",
  type: "record-property",
  slug: "request",
  propertySlug: "request",
  definition: "what has been asked of a seat and not yet carried out",
  properties: [
    { pageProperty: "relation-property/requested-action", required: true, many: false },
    { pageProperty: "text-property/interrupt-message", required: false, many: false },
    { pageProperty: "instant-property/restart-armed-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat has one request or no request.",
    },
    {
      invariantKind: "departure",
      statement: "A new request takes the place of any request already there.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
