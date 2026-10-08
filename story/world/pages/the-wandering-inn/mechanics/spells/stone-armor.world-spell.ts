import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneArmor = {
  id: "01a06572-95e3-7fb5-aeeb-726a171c39a9",
  type: "page-type/world-spell",
  slug: "stone-armor",
  title: "Stone Armor",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
