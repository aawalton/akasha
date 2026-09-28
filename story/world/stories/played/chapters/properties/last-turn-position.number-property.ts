import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const lastTurnPosition = {
  id: "01a0e5d3-d337-7dbd-bb65-0131d5ddf66a",
  type: "page-type/number-property",
  slug: "last-turn-position",
  propertySlug: "last-turn-position",
  definition: "the position of the last turn a chapter took",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The next turn of a story left with no open turn sits one past this position.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
