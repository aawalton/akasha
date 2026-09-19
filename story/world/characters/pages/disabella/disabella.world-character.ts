import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const disabella = {
  id: "01a0b70a-1a0b-7b29-9e51-fd13e55a88ce",
  type: "page-type/world-character",
  slug: "disabella",
  title: "Disabella",
  world: "world/the-wandering-inn",
  firstChapter: 410,
  lastChapter: 410,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
