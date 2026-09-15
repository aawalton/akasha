import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const voteAverage = {
  id: "01a06599-ee09-700a-8a23-63fc2cc72b2f",
  type: "page-type/number-property",
  slug: "vote-average",
  propertySlug: "vote-average",
  definition: "how the provider's voters scored a collection out of ten",
  max: 10,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A score is the provider's voters' rather than the person's own rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection nobody voted on scores nothing rather than stating no score.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
