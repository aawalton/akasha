import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mella = {
  id: "01a0b70b-e578-71a0-8038-6d496130e185",
  type: "page-type/world-character",
  slug: "mella",
  title: "Mella",
  world: "world/the-wandering-inn",
  firstChapter: 698,
  lastChapter: 698,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
