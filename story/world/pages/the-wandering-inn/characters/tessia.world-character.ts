import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tessia = {
  id: "01a0b70d-1a24-7914-ba34-7d3975f508af",
  type: "page-type/world-character",
  slug: "tessia",
  title: "Tessia",
  world: "world/the-wandering-inn",
  firstChapter: 203,
  lastChapter: 262,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
