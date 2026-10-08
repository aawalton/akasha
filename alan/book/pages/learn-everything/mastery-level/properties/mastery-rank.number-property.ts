import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const masteryRank = {
  id: "01a0784a-cdba-7793-b19f-df140bde480c",
  type: "page-type/number-property",
  slug: "mastery-rank",
  propertySlug: "rank",
  definition: "where a rung sits on the scale, nought to seven",
  max: 7,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The arithmetic folding a topic's coverage reads this number.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T19:56:03.386Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
