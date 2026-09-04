import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HoldingValue = number

export const holdingValue = {
  id: "01a0680a-1a00-7015-9c68-3f8a1d4e1115",
  pageTypeSlug: "number-property",
  slug: "holding-value",
  propertySlug: "holding-value",
  definition: "what the shares an account holds are worth in dollars",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is carried as the sync read it rather than rounded to the cent.",
    },
  ],
} as const satisfies NumberProperty
