import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sleep = {
  id: "01a06572-95e1-7d06-8b84-b0ab1e493347",
  type: "page-type/world-spell",
  slug: "sleep",
  title: "Sleep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
