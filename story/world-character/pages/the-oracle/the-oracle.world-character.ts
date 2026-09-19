import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theOracle = {
  id: "01a0b70d-2021-7585-a94e-4ae72f182ebe",
  type: "page-type/world-character",
  slug: "the-oracle",
  title: "The Oracle",
  world: "world/the-wandering-inn",
  firstChapter: 457,
  lastChapter: 457,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
