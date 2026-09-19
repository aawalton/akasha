import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const aaron = {
  id: "01a0b707-5f1e-74b5-84e9-63e9fae67be9",
  type: "page-type/world-character",
  slug: "aaron",
  title: "Aaron Vanwell",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 771,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
