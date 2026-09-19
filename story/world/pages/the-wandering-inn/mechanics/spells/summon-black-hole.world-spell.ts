import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonBlackHole = {
  id: "01a06572-95e4-7442-b8c6-d2f0bfbeba37",
  type: "page-type/world-spell",
  slug: "summon-black-hole",
  title: "Summon Black Hole",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
