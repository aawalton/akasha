import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dramaw = {
  id: "01a0b70a-1d04-7804-b5a4-8e16298f2e7a",
  type: "page-type/world-character",
  slug: "dramaw",
  title: "Dramaw",
  world: "world/the-wandering-inn",
  firstChapter: 501,
  lastChapter: 501,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
