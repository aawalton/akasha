import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const baiss = {
  id: "01a0b707-7919-75cb-846f-db4a5255c608",
  type: "page-type/world-character",
  slug: "baiss",
  title: "Baiss",
  world: "world/the-wandering-inn",
  firstChapter: 274,
  lastChapter: 274,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
