import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const erashelle = {
  id: "01a0b70a-6e13-7255-be62-74b199ffa8e0",
  type: "page-type/world-character",
  slug: "erashelle",
  title: "Erashelle",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
