import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const alterSpell = {
  id: "01a06572-95b4-7dca-b5f3-b87544258c11",
  type: "page-type/world-spell",
  slug: "alter-spell",
  title: "Alter Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
