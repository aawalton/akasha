import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneShard = {
  id: "01a06572-95e3-7a06-ae2a-f948c842443f",
  type: "page-type/world-spell",
  slug: "stone-shard",
  title: "Stone Shard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
