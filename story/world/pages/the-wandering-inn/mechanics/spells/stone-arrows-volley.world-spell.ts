import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneArrowsVolley = {
  id: "01a06572-95e3-78ce-99d9-c104e9453b6f",
  type: "page-type/world-spell",
  slug: "stone-arrows-volley",
  title: "Stone Arrows: Volley",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
