import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const merchantPatterns = {
  id: "01a0680c-3c00-700a-8e26-5b3d7f4a310b",
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
  types: "ts",
} as const satisfies TextProperty
