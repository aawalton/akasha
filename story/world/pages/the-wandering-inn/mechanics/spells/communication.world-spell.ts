import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const communication = {
  id: "01a06572-95b9-7078-abf5-988465c5cbc3",
  type: "page-type/world-spell",
  slug: "communication",
  title: "Communication",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
