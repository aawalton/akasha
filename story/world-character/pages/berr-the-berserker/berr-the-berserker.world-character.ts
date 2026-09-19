import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const berrTheBerserker = {
  id: "01a0b707-814b-72d2-a63b-4ac93d6613b3",
  type: "page-type/world-character",
  slug: "berr-the-berserker",
  title: "Berr",
  world: "world/the-wandering-inn",
  firstChapter: 638,
  lastChapter: 638,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
