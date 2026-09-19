import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const enforcerBrother = {
  id: "01a0b70a-6db4-79c4-92b7-57149c727932",
  type: "page-type/world-character",
  slug: "enforcer-brother",
  title: "the Brother",
  world: "world/the-wandering-inn",
  firstChapter: 347,
  lastChapter: 347,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
