import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const midnightShards = {
  id: "01a06572-95d9-74f8-b51d-73e341d05471",
  type: "world-spell",
  slug: "midnight-shards",
  title: "Midnight Shards",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
