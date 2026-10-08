import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const spy = {
  id: "01a06580-2495-7263-a2be-230b894bffd3",
  type: "page-type/world-character",
  slug: "spy",
  title: "unknown spy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  eventCount: 6,
  firstChapter: 654,
  lastChapter: 654,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
