import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type DaysToNext = number

export const daysToNext = {
  id: "01a0541b-6a83-7beb-9eb1-d13e2108d749",
  pageTypeSlug: "number-property",
  slug: "days-to-next",
  propertySlug: "days-to-next",
  definition: "how many more green days the rung after this one takes",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The last rung states none, there being no rung after it.",
    },
  ],
} as const satisfies NumberProperty
