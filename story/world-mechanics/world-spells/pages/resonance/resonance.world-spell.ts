import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const resonance = {
  id: "01a06572-95dd-7ca4-8c72-cf8b8a236652",
  type: "world-spell",
  slug: "resonance",
  title: "Resonance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
