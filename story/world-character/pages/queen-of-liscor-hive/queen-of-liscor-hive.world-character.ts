import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const queenOfLiscorHive = {
  id: "01a0b70c-7ae7-769c-bfe4-1d21d9bfa48a",
  type: "page-type/world-character",
  slug: "queen-of-liscor-hive",
  title: "the Queen",
  world: "world/the-wandering-inn",
  firstChapter: 105,
  lastChapter: 105,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
