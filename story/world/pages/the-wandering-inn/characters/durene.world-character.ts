import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const durene = {
  id: "01a06580-2494-7da1-83d2-811ddbe40d10",
  type: "page-type/world-character",
  slug: "durene",
  title: "Durene",
  world: "world/the-wandering-inn",
  appearanceCount: 33,
  eventCount: 2,
  firstChapter: 124,
  lastChapter: 476,
  characterClaims: "jsonl",
  aliasOf: "world-character/durene-faerise",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
