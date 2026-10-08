import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const richard = {
  id: "01a0b70c-96ee-7648-b591-8432e0c5d8c7",
  type: "page-type/world-character",
  slug: "richard",
  title: "Richard",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 97,
  lastChapter: 438,
  characterClaims: "jsonl",
  aliasOf: "world-character/richard-davenport",
  createdAt: "2026-09-19T00:24:10.734Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
