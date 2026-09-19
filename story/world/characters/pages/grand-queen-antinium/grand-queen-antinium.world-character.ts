import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grandQueenAntinium = {
  id: "01a0b70a-e971-7a26-9109-08e408e98b36",
  type: "page-type/world-character",
  slug: "grand-queen-antinium",
  title: "Grand Queen of the Antinium",
  world: "world/the-wandering-inn",
  firstChapter: 238,
  lastChapter: 238,
  characterClaims: "jsonl",
  aliasOf: "world-character/grand-queen",
} as const satisfies WorldCharacter
