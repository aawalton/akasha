import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const absorbRecollections = {
  id: "01a06572-95b2-705d-bb56-23fc98666a9e",
  type: "world-spell",
  slug: "absorb-recollections",
  title: "Absorb Recollections",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
