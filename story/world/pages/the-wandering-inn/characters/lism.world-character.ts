import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lism = {
  id: "01a0b70b-8768-7df7-baa1-8d50b99794f8",
  type: "page-type/world-character",
  slug: "lism",
  title: "Lism",
  world: "world/the-wandering-inn",
  firstChapter: 14,
  lastChapter: 821,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
