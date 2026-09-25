import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const setDropMechanics = {
  id: "01a0d8e1-0ebf-76c3-8e63-fb048d5d7c5f",
  type: "page-type/number-property",
  slug: "set-drop-mechanics",
  propertySlug: "set-drop-mechanics",
  definition: "the numbers the sets addon gives the ways a set's pieces drop",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A way is stated once for each place a piece drops, so a number can repeat.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
