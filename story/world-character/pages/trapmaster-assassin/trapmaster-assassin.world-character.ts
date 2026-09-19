import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const trapmasterAssassin = {
  id: "01a0b70d-6fc4-7fe9-baae-cd0a9c9f0e56",
  type: "page-type/world-character",
  slug: "trapmaster-assassin",
  title: "The Trapmaster",
  world: "world/the-wandering-inn",
  firstChapter: 443,
  lastChapter: 443,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
