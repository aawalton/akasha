import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const arrowsOfFlame = {
  id: "01a06572-95b4-7a97-ba6d-95512610e77a",
  type: "world-spell",
  slug: "arrows-of-flame",
  title: "Arrows of Flame",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
