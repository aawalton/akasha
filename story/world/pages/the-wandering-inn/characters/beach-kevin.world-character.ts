import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beachKevin = {
  id: "01a0b759-feb6-7ee1-bc9a-b2f159165e92",
  type: "page-type/world-character",
  slug: "beach-kevin",
  title: "Beach Kevin",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 750,
  lastChapter: 753,
  characterClaims: "jsonl",
  mergedInto: "world-character/kevin",
  createdAt: "2026-09-19T01:48:43.574Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
