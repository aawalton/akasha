import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const venaz = {
  id: "01a06580-2495-7cb0-b614-b7d1c864788f",
  type: "page-type/world-character",
  slug: "venaz",
  title: "Venaz",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  eventCount: 1,
  firstChapter: 111,
  lastChapter: 802,
  characterClaims: "jsonl",
  aliasOf: "world-character/venaz-hammerad",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
