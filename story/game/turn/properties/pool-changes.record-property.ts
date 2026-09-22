import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const poolChanges = {
  id: "01a0c692-5f45-79dc-abc9-9af5cb8c3a4d",
  type: "page-type/record-property",
  slug: "pool-changes",
  propertySlug: "changes",
  definition: "what a turn took from the pools play spends, and what it gave back",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "number-property/pool-change", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool a turn left alone is written nowhere on that turn.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
