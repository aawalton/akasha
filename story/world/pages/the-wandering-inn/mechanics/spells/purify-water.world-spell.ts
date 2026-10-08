import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const purifyWater = {
  id: "01a06572-95db-703b-854e-cb211089fcb4",
  type: "page-type/world-spell",
  slug: "purify-water",
  title: "Purify Water",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
