import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zevara = {
  id: "01a06580-2495-7afc-97ce-f7f01120a61b",
  type: "page-type/world-character",
  slug: "zevara",
  title: "Zevara",
  world: "world/the-wandering-inn",
  appearanceCount: 56,
  eventCount: 12,
  firstChapter: 31,
  lastChapter: 780,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
