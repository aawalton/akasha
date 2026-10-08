import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blightedKing = {
  id: "01a0b707-8774-7dcf-bddd-259622fa7e6c",
  type: "page-type/world-character",
  slug: "blighted-king",
  title: "the Blighted King",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 12,
  lastChapter: 310,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:39.092Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
