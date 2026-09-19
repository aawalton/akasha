import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kevinDeceased = {
  id: "01a0b70b-6807-7885-b09c-6e76af8924b6",
  type: "page-type/world-character",
  slug: "kevin-deceased",
  title: "Kevin",
  world: "world/the-wandering-inn",
  firstChapter: 716,
  lastChapter: 716,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
