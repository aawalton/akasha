import type { TextProperty } from "@akasha/pages-system/text-property"

export type Month = string

export const month = {
  id: "01a05fd3-4360-7a66-bbea-ef6b3350a083",
  pageTypeSlug: "text-property",
  slug: "month",
  propertySlug: "month",
  definition: "the calendar month a page gathers",
  max: 7,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A month is written as the four-digit year and the two-digit month joined by a hyphen.",
    },
  ],
} as const satisfies TextProperty
