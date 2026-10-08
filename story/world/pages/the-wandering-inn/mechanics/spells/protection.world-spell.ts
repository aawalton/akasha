import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const protection = {
  id: "01a06572-95db-7b66-b870-a9a4acd2f7a7",
  type: "page-type/world-spell",
  slug: "protection",
  title: "Protection",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
