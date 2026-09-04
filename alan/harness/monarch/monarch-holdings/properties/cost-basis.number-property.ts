import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CostBasis = number

export const costBasis = {
  id: "01a0680a-1a00-7014-8a71-2b6d5e9f1114",
  pageTypeSlug: "number-property",
  slug: "cost-basis",
  propertySlug: "cost-basis",
  definition: "what was paid for the shares an account holds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A holding reports nothing paid where the account never told Monarch what was.",
    },
  ],
} as const satisfies NumberProperty
