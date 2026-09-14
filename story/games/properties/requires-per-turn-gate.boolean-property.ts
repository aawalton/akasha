import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const requiresPerTurnGate = {
  id: "01a0673c-8e0e-700d-8168-6b133a35d315",
  type: "boolean-property",
  slug: "requires-per-turn-gate",
  propertySlug: "requires-per-turn-gate",
  definition: "whether every turn is judged before it reaches the player",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No code in this checkout reads this property.",
    },
    {
      invariantKind: "departure",
      statement: "The harness writing a game's turns is outside this checkout and honours this.",
    },
    {
      invariantKind: "departure",
      statement: "A game declaring this carries a gate verdict on every turn it publishes.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
