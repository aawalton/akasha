import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grandQueen = {
  id: "01a0b70a-e93a-7f3b-a841-993313a986ad",
  type: "page-type/world-character",
  slug: "grand-queen",
  title: "Grand Queen of the Antinium",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  firstChapter: 274,
  lastChapter: 805,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:20.730Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
