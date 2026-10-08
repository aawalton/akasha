import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const butler = {
  id: "01a0b707-8b9f-7458-aad9-d21a33c2445d",
  type: "page-type/world-character",
  slug: "butler",
  title: "the butler",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 105,
  lastChapter: 105,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:40.159Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
