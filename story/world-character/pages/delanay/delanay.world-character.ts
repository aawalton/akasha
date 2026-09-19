import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const delanay = {
  id: "01a0b70a-14c7-72c9-aa87-da9d5dc0bc21",
  type: "page-type/world-character",
  slug: "delanay",
  title: "Delanay d'Artien",
  world: "world/the-wandering-inn",
  firstChapter: 430,
  lastChapter: 430,
  characterClaims: "jsonl",
  aliasOf: "world-character/delanay-d-artien",
} as const satisfies WorldCharacter
