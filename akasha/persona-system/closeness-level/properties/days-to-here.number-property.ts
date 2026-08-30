import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

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
      statement: "The first rung takes none, being where everyone starts.",
    },
  ],
} as const satisfies NumberProperty
