import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hammerOfTheMountainKing = {
  id: "01a06572-95c8-7bd2-b628-e0363335ab12",
  type: "world-spell",
  slug: "hammer-of-the-mountain-king",
  title: "Hammer of the Mountain King",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
