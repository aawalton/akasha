import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kel = {
  id: "01a0b70b-6167-7ed1-8f59-104e124aa0f7",
  type: "page-type/world-character",
  slug: "kel",
  title: "Kel",
  world: "world/the-wandering-inn",
  firstChapter: 390,
  lastChapter: 390,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
