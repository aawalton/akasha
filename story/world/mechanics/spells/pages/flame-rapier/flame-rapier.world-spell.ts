import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameRapier = {
  id: "01a06572-95c3-7853-919d-c8539a592259",
  type: "page-type/world-spell",
  slug: "flame-rapier",
  title: "Flame Rapier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
