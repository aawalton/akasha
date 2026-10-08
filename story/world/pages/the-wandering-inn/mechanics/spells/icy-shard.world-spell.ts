import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const icyShard = {
  id: "01a06572-95cb-780b-9a0e-1ea33abc723d",
  type: "page-type/world-spell",
  slug: "icy-shard",
  title: "Icy Shard",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
