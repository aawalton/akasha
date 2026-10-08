import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barkskin = {
  id: "01a06572-95b5-7146-b1d1-64b0cf6b03e3",
  type: "page-type/world-spell",
  slug: "barkskin",
  title: "Barkskin",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
