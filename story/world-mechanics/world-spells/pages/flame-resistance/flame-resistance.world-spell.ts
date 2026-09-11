import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameResistance = {
  id: "01a06572-95c3-720c-98cc-27bdffab5520",
  type: "world-spell",
  slug: "flame-resistance",
  title: "Flame Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
