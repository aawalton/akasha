import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const generalThelican = {
  id: "01a0b70a-9656-785a-85b5-9e1a8202634a",
  type: "page-type/world-character",
  slug: "general-thelican",
  title: "General Thelican",
  world: "world/the-wandering-inn",
  firstChapter: 369,
  lastChapter: 577,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
