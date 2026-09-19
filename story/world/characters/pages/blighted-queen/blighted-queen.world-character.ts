import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blightedQueen = {
  id: "01a0b707-87ab-79a7-b50f-480068b14b02",
  type: "page-type/world-character",
  slug: "blighted-queen",
  title: "the Blighted Queen",
  world: "world/the-wandering-inn",
  firstChapter: 12,
  lastChapter: 217,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
