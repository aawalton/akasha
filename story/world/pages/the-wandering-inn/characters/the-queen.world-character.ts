import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theQueen = {
  id: "01a0b70d-2111-7ab4-8c33-c57975220160",
  type: "page-type/world-character",
  slug: "the-queen",
  title: "the Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 32,
  lastChapter: 32,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:46.097Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
