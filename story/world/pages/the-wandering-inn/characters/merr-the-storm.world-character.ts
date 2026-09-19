import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merrTheStorm = {
  id: "01a0b70b-ea14-77e7-a732-5e2655c56921",
  type: "page-type/world-character",
  slug: "merr-the-storm",
  title: "Merr",
  world: "world/the-wandering-inn",
  firstChapter: 529,
  lastChapter: 552,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
