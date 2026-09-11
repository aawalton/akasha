import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massSlow = {
  id: "01a06572-95d2-7a7e-bbfc-0584e12ac3f3",
  type: "world-spell",
  slug: "mass-slow",
  title: "Mass Slow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
