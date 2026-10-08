import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneShard = {
  id: "01a06572-95e3-7a06-ae2a-f948c842443f",
  type: "page-type/world-spell",
  slug: "stone-shard",
  title: "Stone Shard",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
