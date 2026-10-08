import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const frieke = {
  id: "01a0b70a-8ce8-79ae-a27e-d3d18b7cb4f0",
  type: "page-type/world-character",
  slug: "frieke",
  title: "Frieke",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 806,
  lastChapter: 809,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:57.096Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
