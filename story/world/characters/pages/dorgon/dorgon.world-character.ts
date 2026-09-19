import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dorgon = {
  id: "01a0b70a-1b89-758e-afb7-ce289d5bc8ff",
  type: "page-type/world-character",
  slug: "dorgon",
  title: "Dorgon",
  world: "world/the-wandering-inn",
  firstChapter: 505,
  lastChapter: 505,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
