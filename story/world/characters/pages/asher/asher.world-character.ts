import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const asher = {
  id: "01a0b707-74f6-7d96-89be-31de2a28f03b",
  type: "page-type/world-character",
  slug: "asher",
  title: "Asher",
  world: "world/the-wandering-inn",
  firstChapter: 695,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
