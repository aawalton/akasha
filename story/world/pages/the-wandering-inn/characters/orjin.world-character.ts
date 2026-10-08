import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const orjin = {
  id: "01a06580-2495-762b-8ec7-13ac83d2f761",
  type: "page-type/world-character",
  slug: "orjin",
  title: "Orjin",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  eventCount: 12,
  firstChapter: 326,
  lastChapter: 674,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
