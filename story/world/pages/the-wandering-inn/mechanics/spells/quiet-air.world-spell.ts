import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const quietAir = {
  id: "01a06572-95db-7d51-8af3-d541cba66b87",
  type: "page-type/world-spell",
  slug: "quiet-air",
  title: "Quiet Air",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
