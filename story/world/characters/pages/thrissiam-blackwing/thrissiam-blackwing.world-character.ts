import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const thrissiamBlackwing = {
  id: "01a0b70d-6409-7c68-8da5-b5a4f71f5bad",
  type: "page-type/world-character",
  slug: "thrissiam-blackwing",
  title: "Thrissiam Blackwing",
  world: "world/the-wandering-inn",
  firstChapter: 193,
  lastChapter: 232,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
