import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const larr = {
  id: "01a0b70b-7b8a-7b4b-8cc9-d2322c03c4d3",
  type: "page-type/world-character",
  slug: "larr",
  title: "Larr",
  world: "world/the-wandering-inn",
  firstChapter: 185,
  lastChapter: 245,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
