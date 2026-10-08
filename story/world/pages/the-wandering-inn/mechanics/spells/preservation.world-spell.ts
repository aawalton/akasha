import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const preservation = {
  id: "01a06572-95db-77c5-b343-22bb4aedaf57",
  type: "page-type/world-spell",
  slug: "preservation",
  title: "Preservation",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
