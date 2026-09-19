import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const geilouna = {
  id: "01a0b70a-94e3-7b2d-8ad6-1af36ab2122e",
  type: "page-type/world-character",
  slug: "geilouna",
  title: "Geilouna Desoyvel",
  world: "world/the-wandering-inn",
  firstChapter: 503,
  lastChapter: 503,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
