import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rima = {
  id: "01a0b70c-995b-7af5-bc20-1df9ad129e8d",
  type: "page-type/world-character",
  slug: "rima",
  title: "Rima",
  world: "world/the-wandering-inn",
  firstChapter: 382,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
