import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dalySullivan = {
  id: "01a0b70a-0ef4-7d64-8481-b9951db1dfd8",
  type: "page-type/world-character",
  slug: "daly-sullivan",
  title: "Daly Sullivan",
  world: "world/the-wandering-inn",
  firstChapter: 315,
  lastChapter: 776,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
