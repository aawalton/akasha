import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const chapterTurnCovers = {
  id: "01a0e5cc-d3bc-7308-be9d-19011bb2e2f4",
  type: "page-type/record-property",
  slug: "chapter-turn-covers",
  propertySlug: "turn-covers",
  definition: "the picture of one turn a chapter took",
  properties: [
    { pageProperty: "number-property/position", required: true, many: false },
    { pageProperty: "relation-property/cover", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter keeps the cover of every turn it takes, under that turn's number.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
