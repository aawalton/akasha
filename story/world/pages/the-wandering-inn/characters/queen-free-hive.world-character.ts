import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const queenFreeHive = {
  id: "01a0b70c-7a80-79fb-80f3-0732223c2807",
  type: "page-type/world-character",
  slug: "queen-free-hive",
  title: "the Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 25,
  lastChapter: 25,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:03.456Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
