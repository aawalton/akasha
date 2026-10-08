import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const antiniumQueen = {
  id: "01a0b707-6f51-7102-aa49-117e493fb30f",
  type: "page-type/world-character",
  slug: "antinium-queen",
  title: "the Queen of the Antinium",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 33,
  lastChapter: 40,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:32.913Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
