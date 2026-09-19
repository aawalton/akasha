import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tessa = {
  id: "01a0b70d-1976-7869-ae94-2517847601b3",
  type: "page-type/world-character",
  slug: "tessa",
  title: "Tessa",
  world: "world/the-wandering-inn",
  firstChapter: 612,
  lastChapter: 780,
  characterClaims: "jsonl",
  aliasOf: "world-character/tessa-sharpclaw",
} as const satisfies WorldCharacter
