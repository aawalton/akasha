import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const marian = {
  id: "01a0b70b-9a71-7dc8-896d-94c418e8a00a",
  type: "page-type/world-character",
  slug: "marian",
  title: "Marian",
  world: "world/the-wandering-inn",
  firstChapter: 60,
  lastChapter: 575,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
