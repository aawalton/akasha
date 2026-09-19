import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcaneBarriers = {
  id: "01a06572-95b4-73c3-87fa-e08ca9871fe6",
  type: "page-type/world-spell",
  slug: "arcane-barriers",
  title: "Arcane Barriers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
