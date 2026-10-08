import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const teres = {
  id: "01a06580-2495-75c6-a707-59fb3e45232a",
  type: "page-type/world-character",
  slug: "teres",
  title: "Teres",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  eventCount: 4,
  firstChapter: 177,
  lastChapter: 454,
  characterClaims: "jsonl",
  aliasOf: "world-character/teresa-atwood",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
