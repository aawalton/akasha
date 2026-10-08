import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSpray = {
  id: "01a06572-95e3-7595-9fc4-70c5e4019bb1",
  type: "page-type/world-spell",
  slug: "stone-spray",
  title: "Stone Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
