import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const prha = {
  id: "01a0b70c-72d5-7de2-8c93-1fcf8e90abb8",
  type: "page-type/world-character",
  slug: "prha",
  title: "Prha",
  world: "world/the-wandering-inn",
  firstChapter: 543,
  lastChapter: 543,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
