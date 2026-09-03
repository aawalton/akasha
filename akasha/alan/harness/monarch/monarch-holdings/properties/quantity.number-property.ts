import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Quantity = number

export const quantity = {
  id: "01a0680a-1a00-7013-b452-9d3f7a8c1113",
  pageTypeSlug: "number-property",
  slug: "quantity",
  propertySlug: "quantity",
  definition: "how many shares of a security an account holds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quantity runs to fractions of a share.",
    },
  ],
} as const satisfies NumberProperty
