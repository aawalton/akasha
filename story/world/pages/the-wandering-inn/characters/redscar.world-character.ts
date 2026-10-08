import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const redscar = {
  id: "01a06580-2495-7996-88ea-047d800a97c1",
  type: "page-type/world-character",
  slug: "redscar",
  title: "Redscar",
  world: "world/the-wandering-inn",
  appearanceCount: 24,
  eventCount: 4,
  firstChapter: 155,
  lastChapter: 760,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
