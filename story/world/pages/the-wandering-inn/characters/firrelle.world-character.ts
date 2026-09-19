import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const firrelle = {
  id: "01a0b70a-88a9-7ada-9626-c235e6e8c6e3",
  type: "page-type/world-character",
  slug: "firrelle",
  title: "Firrelle",
  world: "world/the-wandering-inn",
  firstChapter: 470,
  lastChapter: 590,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
