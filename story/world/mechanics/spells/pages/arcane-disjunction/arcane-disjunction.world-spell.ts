import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcaneDisjunction = {
  id: "01a06572-95b4-792a-bf08-37dafd3acb87",
  type: "page-type/world-spell",
  slug: "arcane-disjunction",
  title: "Arcane Disjunction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
