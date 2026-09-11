import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneFloor = {
  id: "01a06572-95e3-78f3-ae9d-3cb94d5b1657",
  type: "world-spell",
  slug: "stone-floor",
  title: "Stone Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
