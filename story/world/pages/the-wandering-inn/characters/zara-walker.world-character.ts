import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zaraWalker = {
  id: "01a0b70d-e88e-7b9d-b683-07bda6b9c5a7",
  type: "page-type/world-character",
  slug: "zara-walker",
  title: "Zara Walker",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
