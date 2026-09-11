import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manaBrick = {
  id: "01a06572-95d1-7e24-9a52-b1c0cd5cfbbe",
  type: "world-spell",
  slug: "mana-brick",
  title: "Mana Brick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
