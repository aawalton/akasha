import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yorm = {
  id: "01a0b70d-e1c0-7bab-9795-6c58e974c103",
  type: "page-type/world-character",
  slug: "yorm",
  title: "Yorm",
  world: "world/the-wandering-inn",
  firstChapter: 794,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
