import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type MerchantPatterns = List<string>

export const merchantPatterns = {
  id: "01a0680c-3c00-700a-8e26-5b3d7f4a310b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "merchant-patterns",
  propertySlug: "merchant-patterns",
  definition: "a run of the bank's own words that names a merchant",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pattern is copied from the bank's line exactly including its abbreviations.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern matches where the bank's line has that pattern anywhere.",
    },
  ],
} as const satisfies TextProperty
