import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blehTrollQueen = {
  id: "01a0b707-873c-7ed7-8efd-c9ff05ce4679",
  type: "page-type/world-character",
  slug: "bleh-troll-queen",
  title: "Bleh",
  world: "world/the-wandering-inn",
  firstChapter: 534,
  lastChapter: 534,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
