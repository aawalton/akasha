import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ikrr = {
  id: "01a0b70b-0789-72ad-b6a7-2e93b7a74ac4",
  type: "page-type/world-character",
  slug: "ikrr",
  title: "Ikrr",
  world: "world/the-wandering-inn",
  firstChapter: 436,
  lastChapter: 436,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
