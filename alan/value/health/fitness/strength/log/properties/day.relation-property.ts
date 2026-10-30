import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const day = {
  id: "01a077c9-150b-7560-ba89-d3c1c8821d62",
  type: "page-type/relation-property",
  slug: "day",
  propertySlug: "day",
  definition: "the day an exercise set was performed on",
  targetPageType: "page-type/day",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day counts an exercise set by this edge rather than by matching two dates.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The day named is the only day an exercise set has, and the instant says when inside that day.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T17:34:21.963Z",
  updatedAt: "2026-10-30T17:21:15.945Z",
} as const satisfies RelationProperty
