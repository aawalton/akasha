import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const chapterTurnStarts = {
  id: "01a17f34-c641-7a15-a720-6049f8582e9e",
  type: "page-type/record-property",
  slug: "chapter-turn-starts",
  propertySlug: "turn-starts",
  definition: "the paragraph of a chapter's prose each folded turn begins at",
  properties: [
    { pageProperty: "number-property/position", required: true, many: false },
    { pageProperty: "number-property/turn-start-paragraph", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter keeps where each turn it takes begins, under that turn's number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each outcome line a chapter keeps names the turn it came from by that number.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T21:12:07.489Z",
  updatedAt: "2026-10-27T21:12:07.489Z",
} as const satisfies RecordProperty
