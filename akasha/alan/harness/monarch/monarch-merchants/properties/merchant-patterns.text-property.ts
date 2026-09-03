import type { TextProperty } from "@akasha/pages-system/text-property"

export type MerchantPatterns = string

export const merchantPatterns = {
  id: "01a0680c-3c00-700a-8e26-5b3d7f4a310b",
  pageTypeSlug: "text-property",
  slug: "merchant-patterns",
  propertySlug: "merchant-patterns",
  definition: "a run of the bank's own words that names a merchant",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pattern is copied from the bank's line exactly, abbreviations and all.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern matches where the bank's line holds it anywhere.",
    },
  ],
} as const satisfies TextProperty
