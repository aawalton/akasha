import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bograms = {
  id: "01a0b707-884c-79b8-83d6-d5ea90d6b955",
  type: "page-type/world-character",
  slug: "bograms",
  title: "Bograms",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 677,
  lastChapter: 684,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:39.308Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
