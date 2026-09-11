import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const absorbLife = {
  id: "01a06572-95b2-7820-b6ff-763517da1a6f",
  type: "world-spell",
  slug: "absorb-life",
  title: "Absorb Life",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
