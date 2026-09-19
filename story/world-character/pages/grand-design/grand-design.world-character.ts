import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const grandDesign = {
  id: "01a0b70a-e897-7a14-85e5-4c2e8713d8e9",
  type: "page-type/world-character",
  slug: "grand-design",
  title: "The Grand Design of Isthekenous",
  world: "world/the-wandering-inn",
  firstChapter: 674,
  lastChapter: 764,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
