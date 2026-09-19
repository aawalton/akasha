import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tesy = {
  id: "01a0b70d-1a5d-7476-ad81-4103ba828b58",
  type: "page-type/world-character",
  slug: "tesy",
  title: "Tesy",
  world: "world/the-wandering-inn",
  firstChapter: 510,
  lastChapter: 678,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
