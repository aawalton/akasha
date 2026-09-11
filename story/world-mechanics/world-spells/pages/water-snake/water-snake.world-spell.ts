import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterSnake = {
  id: "01a06572-95e9-7054-a575-da14db4f3a0b",
  type: "world-spell",
  slug: "water-snake",
  title: "Water Snake",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
