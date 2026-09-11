import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const protection = {
  id: "01a06572-95db-7b66-b870-a9a4acd2f7a7",
  type: "world-spell",
  slug: "protection",
  title: "Protection",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
