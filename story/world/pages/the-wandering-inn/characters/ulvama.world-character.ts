import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulvama = {
  id: "01a06580-2495-7f68-a839-c88ba1cbc32f",
  type: "page-type/world-character",
  slug: "ulvama",
  title: "Ulvama",
  world: "world/the-wandering-inn",
  appearanceCount: 26,
  eventCount: 10,
  firstChapter: 154,
  lastChapter: 805,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
