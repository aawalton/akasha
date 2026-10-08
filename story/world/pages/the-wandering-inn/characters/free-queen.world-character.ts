import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const freeQueen = {
  id: "01a0b70a-8ca9-7c67-9e7c-978b9f702440",
  type: "page-type/world-character",
  slug: "free-queen",
  title: "Free Queen of the Antinium",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  firstChapter: 274,
  lastChapter: 442,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:57.033Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
