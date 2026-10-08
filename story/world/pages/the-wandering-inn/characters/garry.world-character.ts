import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const garry = {
  id: "01a06580-2494-7e3f-986c-3f39b2b99338",
  type: "page-type/world-character",
  slug: "garry",
  title: "Garry",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  eventCount: 39,
  firstChapter: 175,
  lastChapter: 805,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
