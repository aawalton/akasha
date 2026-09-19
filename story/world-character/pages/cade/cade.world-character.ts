import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cade = {
  id: "01a0b707-8c40-706c-a25d-a4525f79f1d5",
  type: "page-type/world-character",
  slug: "cade",
  title: "Cade",
  world: "world/the-wandering-inn",
  firstChapter: 413,
  lastChapter: 446,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
