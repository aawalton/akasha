import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theGrandQueen = {
  id: "01a0b70d-1e49-7eb4-95ef-d7f850b3a80b",
  type: "page-type/world-character",
  slug: "the-grand-queen",
  title: "the first Grand Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 116,
  lastChapter: 116,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:45.385Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
