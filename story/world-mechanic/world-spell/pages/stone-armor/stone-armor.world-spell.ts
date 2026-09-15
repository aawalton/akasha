import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const stoneArmor = {
  id: "01a06572-95e3-7fb5-aeeb-726a171c39a9",
  type: "world-spell",
  slug: "stone-armor",
  title: "Stone Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
