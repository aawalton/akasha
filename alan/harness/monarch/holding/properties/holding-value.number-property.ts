import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const holdingValue = {
  id: "01a0680a-1a00-7015-9c68-3f8a1d4e1115",
  type: "number-property",
  slug: "holding-value",
  propertySlug: "holding-value",
  definition: "what the shares an account holds are worth in dollars",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is carried as the sync read that value rather than rounded to the cent.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
