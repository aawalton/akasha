import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hastel = {
  id: "01a0b70a-f2dd-712d-8990-60f80f983b66",
  type: "page-type/world-character",
  slug: "hastel",
  title: "Miss Hastel",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
