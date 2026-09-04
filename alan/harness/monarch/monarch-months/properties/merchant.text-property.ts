import type { TextProperty } from "@akasha/pages-system/text-property"

export type Merchant = string

export const merchant = {
  id: "01a0680b-2b00-7004-a836-4c9d2b7e2105",
  pageTypeSlug: "text-property",
  slug: "merchant",
  propertySlug: "merchant",
  definition: "who or what a transaction was with",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A merchant is Monarch's title for the row rather than the bank's own words.",
    },
    {
      invariantKind: "departure",
      statement: "How the money moved is a merchant where the row's words name no vendor.",
    },
  ],
} as const satisfies TextProperty
