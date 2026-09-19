import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cikroleth = {
  id: "01a0b70a-007c-7366-8f5e-3a4df938a835",
  type: "page-type/world-character",
  slug: "cikroleth",
  title: "Captain Cikroleth",
  world: "world/the-wandering-inn",
  firstChapter: 806,
  lastChapter: 806,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
