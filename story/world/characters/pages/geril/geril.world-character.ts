import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const geril = {
  id: "01a0b70a-9c23-7c94-80d6-74b9432fe447",
  type: "page-type/world-character",
  slug: "geril",
  title: "Geril",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 453,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
