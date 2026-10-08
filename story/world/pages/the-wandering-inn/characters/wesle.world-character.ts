import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wesle = {
  id: "01a0b70d-9cc9-758a-a185-a902b92dd4bf",
  type: "page-type/world-character",
  slug: "wesle",
  title: "Wesle",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  firstChapter: 119,
  lastChapter: 413,
  characterClaims: "jsonl",
  aliasOf: "world-character/wesle-salkis",
  createdAt: "2026-09-19T00:25:17.769Z",
  updatedAt: "2026-09-22T13:09:57.000Z",
} as const satisfies WorldCharacter
