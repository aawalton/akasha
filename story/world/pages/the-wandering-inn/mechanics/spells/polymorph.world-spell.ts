import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const polymorph = {
  id: "01a06572-95db-70ac-bb1f-7fa2f3f2bc61",
  type: "page-type/world-spell",
  slug: "polymorph",
  title: "Polymorph",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
