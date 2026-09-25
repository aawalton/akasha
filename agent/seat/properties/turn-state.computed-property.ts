import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const turnState = {
  id: "01a0d8d9-4ec0-71bf-b400-66c7c3f6abc1",
  type: "page-type/computed-property",
  slug: "turn-state",
  propertySlug: "turn-state",
  definition: "the state a seat's turn is in",
  holds: "relation",
  targetPageType: "page-type/seat-turn-state",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's turn is read by the seat turn reading, as the editor reads it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The editor reads a transcript before it draws, so this state can trail it.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
