import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostResistance = {
  id: "01a06572-95c5-711d-9c1d-7d6cc62ba1fe",
  type: "world-spell",
  slug: "frost-resistance",
  title: "Frost Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
