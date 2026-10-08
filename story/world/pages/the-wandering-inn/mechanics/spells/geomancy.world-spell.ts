import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const geomancy = {
  id: "01a06572-95c6-79b4-a1df-da45a5162d71",
  type: "page-type/world-spell",
  slug: "geomancy",
  title: "Geomancy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
