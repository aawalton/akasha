import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const loverbird = {
  id: "01a0b70b-8d60-7741-9ea4-15c61d3e8908",
  type: "page-type/world-character",
  slug: "loverbird",
  title: "Loverbird",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
