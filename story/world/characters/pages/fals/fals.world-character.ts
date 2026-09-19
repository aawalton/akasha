import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fals = {
  id: "01a0b70a-7b0e-7f2f-b338-12cc9feb4ce5",
  type: "page-type/world-character",
  slug: "fals",
  title: "Fals",
  world: "world/the-wandering-inn",
  firstChapter: 22,
  lastChapter: 627,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
