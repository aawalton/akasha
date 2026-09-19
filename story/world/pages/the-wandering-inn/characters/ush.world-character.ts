import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ush = {
  id: "01a0b70d-8287-7e88-8b68-0da61225e25d",
  type: "page-type/world-character",
  slug: "ush",
  title: "Ush",
  world: "world/the-wandering-inn",
  firstChapter: 500,
  lastChapter: 500,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
