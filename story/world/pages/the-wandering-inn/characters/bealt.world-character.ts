import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bealt = {
  id: "01a0b707-7cda-7c6a-be5b-60b1a0f3e455",
  type: "page-type/world-character",
  slug: "bealt",
  title: "Bealt",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 324,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
