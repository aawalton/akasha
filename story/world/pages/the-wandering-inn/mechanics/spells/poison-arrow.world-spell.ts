import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const poisonArrow = {
  id: "01a06572-95db-7ca2-9651-0ad9ce8f68ca",
  type: "page-type/world-spell",
  slug: "poison-arrow",
  title: "Poison Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
