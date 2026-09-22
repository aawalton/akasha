import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const matchValues = {
  id: "01a0680c-3c00-7002-8e94-3c6a7d1f3103",
  type: "page-type/text-property",
  slug: "match-values",
  propertySlug: "values",
  definition: "the values a clause weighs against a transaction",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is written in the words the vocabulary has rather than in a title.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
