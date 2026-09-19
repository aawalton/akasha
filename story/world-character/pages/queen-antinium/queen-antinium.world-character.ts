import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const queenAntinium = {
  id: "01a0b70c-7a04-7552-a3a6-075b4f9c8b51",
  type: "page-type/world-character",
  slug: "queen-antinium",
  title: "the Queen",
  world: "world/the-wandering-inn",
  firstChapter: 86,
  lastChapter: 93,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
