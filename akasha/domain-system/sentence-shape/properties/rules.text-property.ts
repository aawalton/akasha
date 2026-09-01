import type { TextProperty } from "@akasha/pages-system/text-property"

export type Rules = string

export const rules = {
  id: "01a05da1-60fe-71d5-b052-1cc178752887",
  pageTypeSlug: "text-property",
  slug: "rules",
  propertySlug: "rules",
  definition: "one grammar rule a sentence shape is admitted by",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule is written in the form the grammar reads.",
    },
    {
      invariantKind: "departure",
      statement: "A rule belongs to one sentence shape.",
    },
    {
      invariantKind: "departure",
      statement: "A shape nothing admits is refused by leaving its rules out of the grammar.",
    },
  ],
} as const satisfies TextProperty
