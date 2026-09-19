import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xarkouth = {
  id: "01a0b70d-a2a4-7bd7-a46c-fe10966dd321",
  type: "page-type/world-character",
  slug: "xarkouth",
  title: "Xarkouth",
  world: "world/the-wandering-inn",
  firstChapter: 509,
  lastChapter: 678,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
