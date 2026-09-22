import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const sourceTurn = {
  id: "01a0c949-fc72-7d3d-bfa3-ef3530b02254",
  type: "page-type/number-property",
  slug: "source-turn",
  propertySlug: "turn",
  definition: "the turn a lore entry was drawn from",
  max: 100000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is named by its number rather than by the page for that turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn an entry cites has no page of its own until that turn settles a number.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
