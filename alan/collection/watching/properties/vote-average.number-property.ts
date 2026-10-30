import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const voteAverage = {
  id: "01a06599-ee09-700a-8a23-63fc2cc72b2f",
  type: "page-type/number-property",
  slug: "vote-average",
  propertySlug: "vote-average",
  definition: "the score that people give to a collection",
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
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-10-30T15:18:58.895Z",
} as const satisfies NumberProperty
