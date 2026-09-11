import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const haltMomentum = {
  id: "01a06572-95c8-7ee1-9c87-c9c533d43acb",
  type: "world-spell",
  slug: "halt-momentum",
  title: "Halt Momentum",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
