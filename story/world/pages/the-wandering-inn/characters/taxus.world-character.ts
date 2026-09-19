import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const taxus = {
  id: "01a0b70d-13a8-7432-8ca2-c996e58904a6",
  type: "page-type/world-character",
  slug: "taxus",
  title: "Taxus",
  world: "world/the-wandering-inn",
  firstChapter: 655,
  lastChapter: 655,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
