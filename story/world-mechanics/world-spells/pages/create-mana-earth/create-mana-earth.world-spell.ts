import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createManaEarth = {
  id: "01a06572-95bb-7365-be84-d017d0fbada9",
  type: "world-spell",
  slug: "create-mana-earth",
  title: "Create Mana: Earth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
