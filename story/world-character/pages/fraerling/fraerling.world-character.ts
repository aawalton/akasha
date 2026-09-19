import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fraerling = {
  id: "01a0b70a-8c72-7197-9b7b-3c74b0cc729d",
  type: "page-type/world-character",
  slug: "fraerling",
  title: "a man with callused hands",
  world: "world/the-wandering-inn",
  firstChapter: 702,
  lastChapter: 702,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
