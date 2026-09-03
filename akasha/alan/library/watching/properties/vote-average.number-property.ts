import type { NumberProperty } from "@akasha/pages-system/number-property"

export type VoteAverage = number

export const voteAverage = {
  id: "01a06599-ee09-700a-8a23-63fc2cc72b2f",
  pageTypeSlug: "number-property",
  slug: "vote-average",
  propertySlug: "vote-average",
  definition: "how the provider's voters scored a collection out of ten",
  max: 10,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A score is the provider's voters' rather than the person's own rank.",
    },
    {
      invariantKind: "departure",
      statement: "A collection nobody voted on scores nothing rather than stating no score.",
    },
  ],
} as const satisfies NumberProperty
