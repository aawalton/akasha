import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameWalls = {
  id: "01a06572-95c3-7e42-8b84-c67d25e802d2",
  type: "page-type/world-spell",
  slug: "flame-walls",
  title: "Flame Walls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
