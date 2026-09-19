import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fezimet = {
  id: "01a0b70a-843d-7d05-8baa-c996db661f53",
  type: "page-type/world-character",
  slug: "fezimet",
  title: "Fezimet",
  world: "world/the-wandering-inn",
  firstChapter: 331,
  lastChapter: 576,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
