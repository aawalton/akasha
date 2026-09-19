import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tivete = {
  id: "01a0b70d-6588-7f23-abb6-40a33f022029",
  type: "page-type/world-character",
  slug: "tivete",
  title: "Tivete",
  world: "world/the-wandering-inn",
  firstChapter: 692,
  lastChapter: 692,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
