import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const irrel = {
  id: "01a0b70b-12bd-7651-bcf7-17fca0da8ed9",
  type: "page-type/world-character",
  slug: "irrel",
  title: "Irrel",
  world: "world/the-wandering-inn",
  firstChapter: 677,
  lastChapter: 810,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
