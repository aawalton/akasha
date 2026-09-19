import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceShard = {
  id: "01a06572-95c9-70bd-9e06-94164c466d94",
  type: "page-type/world-spell",
  slug: "ice-shard",
  title: "Ice Shard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
