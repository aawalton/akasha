import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manaBarrier = {
  id: "01a06572-95d1-7f49-9b00-53f2777d123a",
  type: "world-spell",
  slug: "mana-barrier",
  title: "Mana Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
