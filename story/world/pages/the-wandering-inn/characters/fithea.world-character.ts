import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fithea = {
  id: "01a0b70a-8999-76a2-b5fd-4a6c7ce78c8a",
  type: "page-type/world-character",
  slug: "fithea",
  title: "Fithea",
  world: "world/the-wandering-inn",
  firstChapter: 533,
  lastChapter: 534,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
