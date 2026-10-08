import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const midnightShards = {
  id: "01a06572-95d9-74f8-b51d-73e341d05471",
  type: "page-type/world-spell",
  slug: "midnight-shards",
  title: "Midnight Shards",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
