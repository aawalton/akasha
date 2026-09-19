import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ferrisThycarl = {
  id: "01a0b70a-813d-77f1-8fcf-3b5d5446a138",
  type: "page-type/world-character",
  slug: "ferris-thycarl",
  title: "Ferris Thycarl",
  world: "world/the-wandering-inn",
  firstChapter: 394,
  lastChapter: 394,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
