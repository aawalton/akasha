import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const menorkel = {
  id: "01a0b70b-e6d4-7178-895b-0b93e7be16c3",
  type: "page-type/world-character",
  slug: "menorkel",
  title: "Menorkel",
  world: "world/the-wandering-inn",
  firstChapter: 534,
  lastChapter: 570,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
