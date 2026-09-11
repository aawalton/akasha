import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const disjunctSpell = {
  id: "01a06572-95bd-70a1-8b40-8a1da042e021",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "disjunct-spell",
  title: "Disjunct Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
