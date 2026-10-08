import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sebornSailwinds = {
  id: "01a06580-2495-7d21-b595-52fa5638ccf5",
  type: "page-type/world-character",
  slug: "seborn-sailwinds",
  title: "Seborn Sailwinds",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  eventCount: 1,
  firstChapter: 401,
  lastChapter: 791,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
