import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const turnPending = {
  id: "01a0541c-db5f-70d8-a32a-c321eef90312",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "turn-pending",
  propertySlug: "turn-pending",
  definition: "what a seat is waiting on before its turn is done",
  properties: [
    { pageProperty: "boolean-property/compacting", required: true, many: false },
    { pageProperty: "boolean-property/live-shell", required: true, many: false },
    { pageProperty: "boolean-property/live-subagent", required: true, many: false },
    { pageProperty: "boolean-property/send-in-flight", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A reminder a seat set for itself is no pending turn start.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
