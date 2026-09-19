import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordMoore = {
  id: "01a0b70b-8a41-7303-b2d1-245dd9481536",
  type: "page-type/world-character",
  slug: "lord-moore",
  title: "Lord Moore",
  world: "world/the-wandering-inn",
  firstChapter: 788,
  lastChapter: 788,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
