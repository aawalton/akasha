import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eribis = {
  id: "01a0b70a-6e9e-714a-85f7-36c296c6f432",
  type: "page-type/world-character",
  slug: "eribis",
  title: "Eribis",
  world: "world/the-wandering-inn",
  firstChapter: 558,
  lastChapter: 558,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
