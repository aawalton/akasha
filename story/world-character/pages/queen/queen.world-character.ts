import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const queen = {
  id: "01a0b70c-79cd-76f0-8fc7-d5d892b0d8cd",
  type: "page-type/world-character",
  slug: "queen",
  title: "the Queen",
  world: "world/the-wandering-inn",
  firstChapter: 28,
  lastChapter: 28,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
