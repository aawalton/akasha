import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eldavinTeriarch = {
  id: "01a0b70a-2636-7630-a971-e098ca7fd475",
  type: "page-type/world-character",
  slug: "eldavin-teriarch",
  title: "Eldavin",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 496,
  lastChapter: 501,
  characterClaims: "jsonl",
  aliasOf: "world-character/teriarch",
  createdAt: "2026-09-19T00:21:30.806Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
