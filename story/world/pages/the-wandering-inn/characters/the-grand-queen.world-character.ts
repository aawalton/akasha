import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theGrandQueen = {
  id: "01a0b70d-1e49-7eb4-95ef-d7f850b3a80b",
  type: "page-type/world-character",
  slug: "the-grand-queen",
  title: "the first Grand Queen",
  world: "world/the-wandering-inn",
  firstChapter: 116,
  lastChapter: 116,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
