import type { TextProperty } from "@akasha/pages-system/text-property"

export type MatchValues = string

export const matchValues = {
  id: "01a0680c-3c00-7002-8e94-3c6a7d1f3103",
  pageTypeSlug: "text-property",
  slug: "match-values",
  propertySlug: "match-values",
  definition: "what a clause holds to weigh a transaction against",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is written in the words the vocabulary holds rather than in a title.",
    },
  ],
} as const satisfies TextProperty
