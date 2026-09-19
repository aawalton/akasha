import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const day = {
  id: "01a077c9-150b-7560-ba89-d3c1c8821d62",
  type: "page-type/relation-property",
  slug: "day",
  propertySlug: "day",
  definition: "the tracked day a set falls on",
  targetPageType: "page-type/day",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day counts a set by this edge rather than by matching two dates.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The day named is the only day a set has, and the instant says when inside that day.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
