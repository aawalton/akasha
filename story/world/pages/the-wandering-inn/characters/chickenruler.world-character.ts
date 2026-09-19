import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const chickenruler = {
  id: "01a0b709-fe1e-7710-b6db-f20e441691ef",
  type: "page-type/world-character",
  slug: "chickenruler",
  title: "Chickenruler",
  world: "world/the-wandering-inn",
  firstChapter: 717,
  lastChapter: 818,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
