import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const uleth = {
  id: "01a0b70d-7bda-75f4-8d53-b85be2e37d6f",
  type: "page-type/world-character",
  slug: "uleth",
  title: "Uleth",
  world: "world/the-wandering-inn",
  firstChapter: 182,
  lastChapter: 182,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
