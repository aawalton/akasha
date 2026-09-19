import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theThirdMind = {
  id: "01a0b70d-21c4-7dd5-b226-4f526301b1cd",
  type: "page-type/world-character",
  slug: "the-third-mind",
  title: "the Third Mind",
  world: "world/the-wandering-inn",
  firstChapter: 546,
  lastChapter: 546,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
