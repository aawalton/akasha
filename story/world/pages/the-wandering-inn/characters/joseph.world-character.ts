import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const joseph = {
  id: "01a06580-2494-77c4-a003-b6b70aa179ea",
  type: "page-type/world-character",
  slug: "joseph",
  title: "Joseph",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  eventCount: 13,
  firstChapter: 109,
  lastChapter: 779,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
