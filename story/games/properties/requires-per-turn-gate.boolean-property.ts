import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type RequiresPerTurnGate = boolean

export const requiresPerTurnGate = {
  id: "01a0673c-8e0e-700d-8168-6b133a35d315",
  pageTypeSlug: "boolean-property",
  slug: "requires-per-turn-gate",
  propertySlug: "requires-per-turn-gate",
  definition: "whether every turn is judged before it reaches the player",
} as const satisfies BooleanProperty
