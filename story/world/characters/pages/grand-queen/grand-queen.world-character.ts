import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grandQueen = {
  id: "01a0b70a-e93a-7f3b-a841-993313a986ad",
  type: "page-type/world-character",
  slug: "grand-queen",
  title: "Grand Queen of the Antinium",
  world: "world/the-wandering-inn",
  firstChapter: 274,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
