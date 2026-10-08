import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const armoredQueen = {
  id: "01a0b707-7204-7641-a0ec-bf00b79d932e",
  type: "page-type/world-character",
  slug: "armored-queen",
  title: "the Armored Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 442,
  lastChapter: 805,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:33.604Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
