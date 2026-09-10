import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type MatchValues = string

export const matchValues = {
  id: "01a0680c-3c00-7002-8e94-3c6a7d1f3103",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "match-values",
  propertySlug: "values",
  definition: "what a clause holds to weigh a transaction against",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is written in the words the vocabulary has rather than in a title.",
    },
  ],
} as const satisfies TextProperty
