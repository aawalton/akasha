import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterBomb = {
  id: "01a06572-95e9-7139-b485-15460ab4ac43",
  type: "world-spell",
  slug: "water-bomb",
  title: "Water Bomb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
