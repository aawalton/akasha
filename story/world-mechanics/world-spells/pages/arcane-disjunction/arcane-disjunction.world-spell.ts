import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const arcaneDisjunction = {
  id: "01a06572-95b4-792a-bf08-37dafd3acb87",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "arcane-disjunction",
  title: "Arcane Disjunction",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
