import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const palaceOfTheIceQueen = {
  id: "01a06572-95da-7eb4-97fa-e5190d4a67ad",
  type: "world-spell",
  slug: "palace-of-the-ice-queen",
  title: "Palace of the Ice Queen",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
