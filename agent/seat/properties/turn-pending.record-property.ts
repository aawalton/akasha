import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const turnPending = {
  id: "01a0541c-db5f-70d8-a32a-c321eef90312",
  type: "page-type/record-property",
  slug: "turn-pending",
  propertySlug: "turn-pending",
  definition: "what a seat is waiting on before its turn is done",
  properties: [
    { pageProperty: "boolean-property/compacting", required: true, many: false },
    { pageProperty: "boolean-property/live-shell", required: true, many: false },
    { pageProperty: "boolean-property/live-subagent", required: true, many: false },
    { pageProperty: "boolean-property/send-in-flight", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A reminder a seat set for itself is no pending turn start.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T19:19:32.447Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RecordProperty
