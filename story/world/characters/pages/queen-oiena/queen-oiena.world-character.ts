import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const queenOiena = {
  id: "01a0b70c-7b18-7c8b-8f88-dcd6d90df197",
  type: "page-type/world-character",
  slug: "queen-oiena",
  title: "Oiena",
  world: "world/the-wandering-inn",
  firstChapter: 551,
  lastChapter: 571,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
