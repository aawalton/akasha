import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kevinHall = {
  id: "01a0b70b-683b-70de-a38e-9b98b2a250ea",
  type: "page-type/world-character",
  slug: "kevin-hall",
  title: "Kevin",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 486,
  lastChapter: 788,
  characterClaims: "jsonl",
  aliasOf: "world-character/kevin",
  createdAt: "2026-09-19T00:22:53.243Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
