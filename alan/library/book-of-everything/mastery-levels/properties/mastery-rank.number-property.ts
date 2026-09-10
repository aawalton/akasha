import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const masteryRank = {
  id: "01a0784a-cdba-7793-b19f-df140bde480c",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "mastery-rank",
  propertySlug: "rank",
  definition: "where a rung sits on the scale, nought to seven",
  max: 7,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The arithmetic folding a topic's coverage reads this number.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
