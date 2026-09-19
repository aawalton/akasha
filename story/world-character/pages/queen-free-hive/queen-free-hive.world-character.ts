import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const queenFreeHive = {
  id: "01a0b70c-7a80-79fb-80f3-0732223c2807",
  type: "page-type/world-character",
  slug: "queen-free-hive",
  title: "the Queen",
  world: "world/the-wandering-inn",
  firstChapter: 25,
  lastChapter: 25,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
