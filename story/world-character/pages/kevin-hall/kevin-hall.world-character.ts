import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kevinHall = {
  id: "01a0b70b-683b-70de-a38e-9b98b2a250ea",
  type: "page-type/world-character",
  slug: "kevin-hall",
  title: "Kevin",
  world: "world/the-wandering-inn",
  firstChapter: 486,
  lastChapter: 788,
  characterClaims: "jsonl",
  aliasOf: "world-character/kevin",
} as const satisfies WorldCharacter
