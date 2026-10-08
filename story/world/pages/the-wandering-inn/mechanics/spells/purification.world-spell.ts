import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const purification = {
  id: "01a06572-95db-7a6a-9919-8f2db05c34f1",
  type: "page-type/world-spell",
  slug: "purification",
  title: "Purification",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
