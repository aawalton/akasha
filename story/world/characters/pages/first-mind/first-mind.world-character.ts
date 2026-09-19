import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const firstMind = {
  id: "01a0b70a-8961-74b8-bc5f-dd9ebd3a453e",
  type: "page-type/world-character",
  slug: "first-mind",
  title: "First Mind",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
