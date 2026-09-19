import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xalandrass = {
  id: "01a0b70d-a26a-7512-bda4-df9232f71aff",
  type: "page-type/world-character",
  slug: "xalandrass",
  title: "Xalandrass",
  world: "world/the-wandering-inn",
  firstChapter: 198,
  lastChapter: 318,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
