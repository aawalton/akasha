import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordCortese = {
  id: "01a0b70b-8926-7cac-81d2-4c75b7f7cd2b",
  type: "page-type/world-character",
  slug: "lord-cortese",
  title: "Lord Cortese",
  world: "world/the-wandering-inn",
  firstChapter: 795,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
