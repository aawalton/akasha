import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massDeathward = {
  id: "01a06572-95d1-7665-86ec-5a8d8927bc08",
  type: "world-spell",
  slug: "mass-deathward",
  title: "Mass Deathward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
