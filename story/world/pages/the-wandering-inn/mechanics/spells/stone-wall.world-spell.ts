import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneWall = {
  id: "01a06572-95e3-706c-8f1d-64c0c53a2d3f",
  type: "page-type/world-spell",
  slug: "stone-wall",
  title: "Stone Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
