import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordMoore = {
  id: "01a0b70b-8a41-7303-b2d1-245dd9481536",
  type: "page-type/world-character",
  slug: "lord-moore",
  title: "Lord Moore",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 788,
  lastChapter: 788,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:01.953Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
