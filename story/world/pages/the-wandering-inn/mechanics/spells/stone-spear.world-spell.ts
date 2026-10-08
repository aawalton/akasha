import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSpear = {
  id: "01a06572-95e3-70df-b438-b975f4967ebd",
  type: "page-type/world-spell",
  slug: "stone-spear",
  title: "Stone Spear",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
