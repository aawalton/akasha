import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rose = {
  id: "01a06580-2495-7938-87c3-0624c314cc9b",
  type: "page-type/world-character",
  slug: "rose",
  title: "Rose",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  eventCount: 4,
  firstChapter: 67,
  lastChapter: 753,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
