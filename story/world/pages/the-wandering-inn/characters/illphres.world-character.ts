import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const illphres = {
  id: "01a0b70b-0870-706b-a0b7-855dd2296169",
  type: "page-type/world-character",
  slug: "illphres",
  title: "Illphres",
  world: "world/the-wandering-inn",
  firstChapter: 158,
  lastChapter: 548,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
