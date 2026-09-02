import type { TextProperty } from "@akasha/pages-system/text-property"

export type DailyTracking = string

export const dailyTracking = {
  id: "01a05fd8-c30f-7127-badb-476efde0211e",
  pageTypeSlug: "text-property",
  slug: "daily-tracking",
  propertySlug: "daily-tracking",
  definition: "the day a stretch of time was part of",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a daily tracking.",
    },
  ],
} as const satisfies TextProperty
