import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const plaguePustule = {
  id: "01a06572-95db-789e-a127-68294d2d33f5",
  type: "page-type/world-spell",
  slug: "plague-pustule",
  title: "Plague Pustule",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
