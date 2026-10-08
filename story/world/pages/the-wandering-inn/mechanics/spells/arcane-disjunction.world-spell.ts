import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcaneDisjunction = {
  id: "01a06572-95b4-792a-bf08-37dafd3acb87",
  type: "page-type/world-spell",
  slug: "arcane-disjunction",
  title: "Arcane Disjunction",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
