import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const turnStateColor = {
  id: "01a06d7a-e9f9-7644-9ee4-9ddcf6b723ba",
  type: "relation-property",
  slug: "turn-state-color",
  propertySlug: "color",
  definition: "the color a seat in this turn state is drawn in",
  targetPageType: "page-type/color",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This color draws the seat rather than the turn state's own page.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
