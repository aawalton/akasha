import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const quantity = {
  id: "01a0680a-1a00-7013-b452-9d3f7a8c1113",
  type: "page-type/number-property",
  slug: "quantity",
  propertySlug: "quantity",
  definition: "how many shares of a security an account holds",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A quantity runs to fractions of a share.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
