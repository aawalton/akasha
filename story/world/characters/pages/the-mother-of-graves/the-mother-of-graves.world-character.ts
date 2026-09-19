import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theMotherOfGraves = {
  id: "01a0b70d-1f36-722f-ad3b-3e49417c7c8e",
  type: "page-type/world-character",
  slug: "the-mother-of-graves",
  title: "the Mother of Graves",
  world: "world/the-wandering-inn",
  firstChapter: 284,
  lastChapter: 284,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
