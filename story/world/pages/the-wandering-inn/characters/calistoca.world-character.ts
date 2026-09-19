import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calistoca = {
  id: "01a0b707-8fb4-7430-b2f7-c20923cffb4a",
  type: "page-type/world-character",
  slug: "calistoca",
  title: "Calistoca",
  world: "world/the-wandering-inn",
  firstChapter: 663,
  lastChapter: 663,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
