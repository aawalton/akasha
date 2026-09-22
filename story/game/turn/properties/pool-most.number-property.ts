import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const poolMost = {
  id: "01a0c69c-2590-7532-882d-56a9cdbaf2fc",
  type: "page-type/number-property",
  slug: "pool-most",
  propertySlug: "most",
  definition: "the most a pool held at a turn, as the game's mechanic worked it out",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic works this out, and the turn it was worked out for keeps it.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
