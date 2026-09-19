import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vitte = {
  id: "01a0b70d-95df-7e31-a77d-6e004332d9e9",
  type: "page-type/world-character",
  slug: "vitte",
  title: "Vitte",
  world: "world/the-wandering-inn",
  firstChapter: 797,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
