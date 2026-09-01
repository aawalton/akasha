import type { NumberProperty } from "@akasha/pages-system/number-property"

export type DaysToHere = number

export const daysToHere = {
  id: "01a0541b-6a82-72e4-a9db-75b5573cc8ee",
  pageTypeSlug: "number-property",
  slug: "days-to-here",
  propertySlug: "days-to-here",
  definition: "how many green days it takes to reach this rung",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first rung takes no days and is where everyone starts.",
    },
  ],
} as const satisfies NumberProperty
