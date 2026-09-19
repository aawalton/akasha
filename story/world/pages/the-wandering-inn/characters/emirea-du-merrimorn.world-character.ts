import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const emireaDuMerrimorn = {
  id: "01a0b70a-6c06-7f2d-ba33-0e9c90b7ff7a",
  type: "page-type/world-character",
  slug: "emirea-du-merrimorn",
  title: "Emirea du Merrimorn",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 496,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
