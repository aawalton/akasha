import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const quantity = {
  id: "01a0680a-1a00-7013-b452-9d3f7a8c1113",
  type: "page-type/number-property",
  slug: "quantity",
  propertySlug: "quantity",
  definition: "the number of stock shares in a Monarch holding",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quantity runs to fractions of a share.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:57:05.450Z",
} as const satisfies NumberProperty
