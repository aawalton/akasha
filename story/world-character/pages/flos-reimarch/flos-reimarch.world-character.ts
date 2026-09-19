import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const flosReimarch = {
  id: "01a0b70a-8a7b-76d0-b5f4-12d4d13ba442",
  type: "page-type/world-character",
  slug: "flos-reimarch",
  title: "Flos Reimarch",
  world: "world/the-wandering-inn",
  firstChapter: 27,
  lastChapter: 757,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
