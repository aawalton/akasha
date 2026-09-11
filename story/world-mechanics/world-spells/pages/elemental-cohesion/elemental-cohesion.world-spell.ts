import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const elementalCohesion = {
  id: "01a06572-95bf-7e24-a1fa-8dbdac49b717",
  type: "world-spell",
  slug: "elemental-cohesion",
  title: "Elemental Cohesion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
