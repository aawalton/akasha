import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const armoredQueen = {
  id: "01a0b707-7204-7641-a0ec-bf00b79d932e",
  type: "page-type/world-character",
  slug: "armored-queen",
  title: "the Armored Queen",
  world: "world/the-wandering-inn",
  firstChapter: 442,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
