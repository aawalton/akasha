import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fortressOfTheIceQueen = {
  id: "01a06572-95c5-7b81-baa9-932e8afe5106",
  type: "world-spell",
  slug: "fortress-of-the-ice-queen",
  title: "Fortress of the Ice Queen",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
