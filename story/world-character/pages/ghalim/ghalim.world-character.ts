import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ghalim = {
  id: "01a0b70a-9ce2-7652-bb20-11143f3c5897",
  type: "page-type/world-character",
  slug: "ghalim",
  title: "Ghalim",
  world: "world/the-wandering-inn",
  firstChapter: 336,
  lastChapter: 336,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
