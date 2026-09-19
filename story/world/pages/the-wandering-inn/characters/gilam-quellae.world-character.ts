import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gilamQuellae = {
  id: "01a0b70a-9d8b-7240-9ad1-234cef37f845",
  type: "page-type/world-character",
  slug: "gilam-quellae",
  title: "Gilam Quellae",
  world: "world/the-wandering-inn",
  firstChapter: 786,
  lastChapter: 786,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
