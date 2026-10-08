import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const poisonCloud = {
  id: "01a06572-95db-7c3e-86c8-ca486864bca0",
  type: "page-type/world-spell",
  slug: "poison-cloud",
  title: "Poison Cloud",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
