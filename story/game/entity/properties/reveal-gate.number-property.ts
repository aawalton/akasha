import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const revealGate = {
  id: "01a0c63d-bf33-7fc8-a461-91fda80ddb15",
  type: "page-type/number-property",
  slug: "reveal-gate",
  propertySlug: "reveal-gate",
  definition: "the turn before which an entity is kept from the player",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity naming no gate is there from the first turn.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A gate the play is never meant to reach is written as a turn far beyond it.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
