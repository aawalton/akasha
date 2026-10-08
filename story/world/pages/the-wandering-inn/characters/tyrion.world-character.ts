import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tyrion = {
  id: "01a06580-2495-7bbd-ab01-957ce84b8c7f",
  type: "page-type/world-character",
  slug: "tyrion",
  title: "Tyrion Veltras",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  eventCount: 11,
  firstChapter: 183,
  lastChapter: 656,
  characterClaims: "jsonl",
  aliasOf: "world-character/tyrion-veltras",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
