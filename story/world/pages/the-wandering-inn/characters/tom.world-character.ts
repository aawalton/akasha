import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tom = {
  id: "01a06580-2495-74f3-acfb-45ed4eaa7a6d",
  type: "page-type/world-character",
  slug: "tom",
  title: "Tom",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  eventCount: 5,
  firstChapter: 97,
  lastChapter: 625,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
