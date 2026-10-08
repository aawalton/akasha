import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yvlon = {
  id: "01a06580-2495-7e40-9c6d-e2dbf8b8f5d9",
  type: "page-type/world-character",
  slug: "yvlon",
  title: "Yvlon",
  world: "world/the-wandering-inn",
  appearanceCount: 65,
  eventCount: 15,
  firstChapter: 53,
  lastChapter: 796,
  characterClaims: "jsonl",
  aliasOf: "world-character/yvlon-byres",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
