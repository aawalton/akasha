import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const torishi = {
  id: "01a0b70d-6de6-79fb-9eea-de76ae676531",
  type: "page-type/world-character",
  slug: "torishi",
  title: "Torishi Weatherfur",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 543,
  lastChapter: 584,
  characterClaims: "jsonl",
  aliasOf: "world-character/torishi-weatherfur",
  createdAt: "2026-09-19T00:25:05.766Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
