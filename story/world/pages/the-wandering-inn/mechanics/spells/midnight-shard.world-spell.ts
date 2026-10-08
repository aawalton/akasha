import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const midnightShard = {
  id: "01a06572-95d9-7cc4-a770-f460358ad4fd",
  type: "page-type/world-spell",
  slug: "midnight-shard",
  title: "Midnight Shard",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
