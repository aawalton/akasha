import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const andel = {
  id: "01a0b707-6e17-7a2e-8e0a-c41966280079",
  type: "page-type/world-character",
  slug: "andel",
  title: "Andel",
  world: "world/the-wandering-inn",
  firstChapter: 382,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
