import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dawil = {
  id: "01a0b70a-1384-711d-a82f-6e9d669d48e8",
  type: "page-type/world-character",
  slug: "dawil",
  title: "Dawil",
  world: "world/the-wandering-inn",
  firstChapter: 231,
  lastChapter: 452,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
