import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const costBasis = {
  id: "01a0680a-1a00-7014-8a71-2b6d5e9f1114",
  type: "page-type/number-property",
  slug: "cost-basis",
  propertySlug: "cost-basis",
  definition: "what was paid for the shares an account holds",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A holding reports nothing paid where the account never told Monarch the cost basis.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
