import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const emperorOfSands = {
  id: "01a0b70a-6ca4-7bac-bd63-d933ee38bc0f",
  type: "page-type/world-character",
  slug: "emperor-of-sands",
  title: "Emperor of Sands",
  world: "world/the-wandering-inn",
  firstChapter: 242,
  lastChapter: 632,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
