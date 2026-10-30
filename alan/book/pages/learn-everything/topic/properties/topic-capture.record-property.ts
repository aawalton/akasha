import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const topicCapture = {
  id: "01a0659f-93da-7010-a67c-81b8b0e31d4b",
  type: "page-type/record-property",
  slug: "topic-capture",
  propertySlug: "capture",
  definition: "the part of a transcript the score of a topic was read from",
  properties: [
    { pageProperty: "text-property/capture-source", required: true, many: false },
    { pageProperty: "number-property/capture-through-line", required: true, many: false },
    { pageProperty: "instant-property/capture-through-at", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic scored from Alan's own words in the room states no capture.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:55:52.026Z",
  updatedAt: "2026-10-30T16:21:32.819Z",
} as const satisfies RecordProperty
