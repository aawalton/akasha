import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twistedQueen = {
  id: "01a0b70d-7739-7089-8301-e0e98f8c46a9",
  type: "page-type/world-character",
  slug: "twisted-queen",
  title: "the Twisted Queen",
  world: "world/the-wandering-inn",
  firstChapter: 442,
  lastChapter: 442,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
