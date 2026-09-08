import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type WakeDaySlug = Slug

export const wakeDaySlug = {
  id: "01a077c9-150b-7560-ba89-d3c1c8821d62",
  pageTypeSlug: "relation-property",
  slug: "wake-day-slug",
  propertySlug: "wake-day-slug",
  definition: "the tracked day a set falls on",
  targetPageTypeSlug: "page-type/wake-day",
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
} as const satisfies RelationProperty
