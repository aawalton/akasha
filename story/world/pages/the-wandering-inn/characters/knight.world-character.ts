import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const knight = {
  id: "01a0b70b-6e32-779f-9696-11fcff0ed7d8",
  type: "page-type/world-character",
  slug: "knight",
  title: "Knight",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 63,
  lastChapter: 64,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:54.770Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
