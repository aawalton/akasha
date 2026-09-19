import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fourthMind = {
  id: "01a0b70a-8c3b-73cf-8b5f-e2597709d402",
  type: "page-type/world-character",
  slug: "fourth-mind",
  title: "Fourth Mind",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
