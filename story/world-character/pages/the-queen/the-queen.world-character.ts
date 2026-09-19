import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theQueen = {
  id: "01a0b70d-2111-7ab4-8c33-c57975220160",
  type: "page-type/world-character",
  slug: "the-queen",
  title: "the Queen",
  world: "world/the-wandering-inn",
  firstChapter: 32,
  lastChapter: 32,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
