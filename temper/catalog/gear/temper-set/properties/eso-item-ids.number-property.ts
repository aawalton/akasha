import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoItemIds = {
  id: "01a0d8bc-31d7-7971-97e8-a1610a7c1393",
  type: "page-type/number-property",
  slug: "eso-item-ids",
  propertySlug: "eso-item-ids",
  definition: "the item ids The Elder Scrolls Online gives the pieces in a set's collection",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ids are read off the game client's own set collection.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
