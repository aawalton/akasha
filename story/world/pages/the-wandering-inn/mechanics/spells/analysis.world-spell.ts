import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const analysis = {
  id: "01a06572-95b4-7b93-b9c5-3f75042a8235",
  type: "page-type/world-spell",
  slug: "analysis",
  title: "Analysis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
