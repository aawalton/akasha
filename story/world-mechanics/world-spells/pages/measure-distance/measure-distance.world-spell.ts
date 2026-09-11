import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const measureDistance = {
  id: "01a06572-95d2-7d75-9130-3ede1d95349f",
  type: "world-spell",
  slug: "measure-distance",
  title: "Measure Distance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
