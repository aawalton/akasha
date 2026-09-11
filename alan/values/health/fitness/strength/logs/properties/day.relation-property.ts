import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const day = {
  id: "01a077c9-150b-7560-ba89-d3c1c8821d62",
  type: "relation-property",
  slug: "day",
  propertySlug: "day",
  definition: "the tracked day a set falls on",
  targetPageType: "page-type/day",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day counts a set by this edge rather than by matching two dates.",
    },
    {
      invariantKind: "departure",
      statement: "The day named is the day the set's own date spells.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
