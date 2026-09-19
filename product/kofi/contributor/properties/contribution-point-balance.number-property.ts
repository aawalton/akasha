import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const contributionPointBalance = {
  id: "01a0ba92-0b87-7f20-9b60-902eea2c3eed",
  type: "page-type/number-property",
  slug: "contribution-point-balance",
  propertySlug: "balance",
  definition: "the points a contributor holds unspent",
  max: 1000000000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A balance is the sum of the transactions beside the contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A balance goes below zero where a reversal takes back points already spent.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
