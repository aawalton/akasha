import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const anama = {
  id: "01a0b707-6d83-7efc-9fc7-7e0c2c2f82d9",
  type: "page-type/world-character",
  slug: "anama",
  title: "Anama",
  world: "world/the-wandering-inn",
  firstChapter: 789,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
