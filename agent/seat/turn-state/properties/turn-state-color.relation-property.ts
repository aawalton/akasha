import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const turnStateColor = {
  id: "01a06d7a-e9f9-7644-9ee4-9ddcf6b723ba",
  type: "page-type/relation-property",
  slug: "turn-state-color",
  propertySlug: "color",
  definition: "the color drawing a seat in this turn state",
  targetPageType: "page-type/color",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This color draws the seat rather than the turn state's own page.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
