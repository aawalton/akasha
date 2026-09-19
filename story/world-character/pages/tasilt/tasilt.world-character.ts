import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tasilt = {
  id: "01a0b70d-1370-78a7-b14e-3fe55a921646",
  type: "page-type/world-character",
  slug: "tasilt",
  title: "Tasilt",
  world: "world/the-wandering-inn",
  firstChapter: 436,
  lastChapter: 436,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
