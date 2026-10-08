import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cirille = {
  id: "01a0b70a-0187-7eb2-9681-f13806daf368",
  type: "page-type/world-character",
  slug: "cirille",
  title: "Commander Cirille",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 438,
  lastChapter: 439,
  characterClaims: "jsonl",
  aliasOf: "world-character/cirille-bitterclaw",
  createdAt: "2026-09-19T00:21:21.415Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
