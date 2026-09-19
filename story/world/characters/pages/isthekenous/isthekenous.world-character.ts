import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const isthekenous = {
  id: "01a0b70b-1577-7d0f-b8c6-c8b6262d7414",
  type: "page-type/world-character",
  slug: "isthekenous",
  title: "Isthekenous",
  world: "world/the-wandering-inn",
  firstChapter: 733,
  lastChapter: 733,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
