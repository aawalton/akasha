import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const queenAntinium = {
  id: "01a0b70c-7a04-7552-a3a6-075b4f9c8b51",
  type: "page-type/world-character",
  slug: "queen-antinium",
  title: "the Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 86,
  lastChapter: 93,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:03.332Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
