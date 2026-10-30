import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const dailyTracking = {
  id: "01a05fd8-c30f-7127-badb-476efde0211e",
  type: "page-type/relation-property",
  slug: "daily-tracking",
  propertySlug: "daily-tracking",
  definition: "the day that holds a tracked session",
  targetPageType: "page-type/day",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tracked session names its day by that day's id rather than by that day's address.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T17:47:54.247Z",
} as const satisfies RelationProperty
