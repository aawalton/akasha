import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const turnStateColor = {
  id: "01a06d7a-e9f9-7644-9ee4-9ddcf6b723ba",
  type: "page-type/relation-property",
  slug: "turn-state-color",
  propertySlug: "color",
  definition: "the color a seat shows in a turn state",
  targetPageType: "page-type/color",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This color draws the seat rather than the turn state's own page.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T17:32:46.969Z",
  updatedAt: "2026-10-30T15:38:26.059Z",
} as const satisfies RelationProperty
