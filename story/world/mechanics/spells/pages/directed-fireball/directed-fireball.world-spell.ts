import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const directedFireball = {
  id: "01a06572-95bd-7ae6-867b-99e8934172a3",
  type: "page-type/world-spell",
  slug: "directed-fireball",
  title: "Directed Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
