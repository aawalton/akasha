import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneFloor = {
  id: "01a06572-95e3-78f3-ae9d-3cb94d5b1657",
  type: "page-type/world-spell",
  slug: "stone-floor",
  title: "Stone Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
