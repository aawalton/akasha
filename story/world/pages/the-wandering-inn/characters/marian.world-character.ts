import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const marian = {
  id: "01a0b70b-9a71-7dc8-896d-94c418e8a00a",
  type: "page-type/world-character",
  slug: "marian",
  title: "Marian",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  firstChapter: 60,
  lastChapter: 575,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:06.097Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
