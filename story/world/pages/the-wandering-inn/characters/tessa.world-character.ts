import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tessa = {
  id: "01a0b70d-1976-7869-ae94-2517847601b3",
  type: "page-type/world-character",
  slug: "tessa",
  title: "Tessa",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 612,
  lastChapter: 780,
  characterClaims: "jsonl",
  aliasOf: "world-character/tessa-sharpclaw",
  createdAt: "2026-09-19T00:24:44.150Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
