import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bearSStrength = {
  id: "01a06572-95b5-7219-a9f8-de0c06624729",
  type: "world-spell",
  slug: "bear-s-strength",
  title: "Bear’s Strength",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
