import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const arcOfMidnight = {
  id: "01a06572-95b4-7183-aff0-bdc739f4fd07",
  type: "world-spell",
  slug: "arc-of-midnight",
  title: "Arc of Midnight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
