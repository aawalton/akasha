import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const conjurePreparedDish = {
  id: "01a06572-95ba-7d1b-bc56-163b5ab2ad70",
  type: "world-spell",
  slug: "conjure-prepared-dish",
  title: "Conjure Prepared Dish",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
