import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jeck = {
  id: "01a0b70b-1ba1-7083-a12d-d1a0935fb54f",
  type: "page-type/world-character",
  slug: "jeck",
  title: "Jeck",
  world: "world/the-wandering-inn",
  firstChapter: 498,
  lastChapter: 498,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
