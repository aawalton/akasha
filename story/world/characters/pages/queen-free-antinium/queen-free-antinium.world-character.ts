import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const queenFreeAntinium = {
  id: "01a0b70c-7a3c-7222-a33a-24733907165f",
  type: "page-type/world-character",
  slug: "queen-free-antinium",
  title: "Queen of the Free Antinium",
  world: "world/the-wandering-inn",
  firstChapter: 206,
  lastChapter: 206,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
