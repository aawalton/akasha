import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneBarrier = {
  id: "01a06572-95e3-708c-9743-420504779d67",
  type: "world-spell",
  slug: "stone-barrier",
  title: "Stone Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
