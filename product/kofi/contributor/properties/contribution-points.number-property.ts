import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const contributionPoints = {
  id: "01a0ba91-9ddb-732d-b40f-1adb82b431fc",
  type: "page-type/number-property",
  slug: "contribution-points",
  propertySlug: "points",
  definition: "the points one transaction carries, positive where earned and negative where spent",
  max: 1000000000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cent contributed is one point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reversal is a transaction of its own carrying the negative of what it reverses.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
