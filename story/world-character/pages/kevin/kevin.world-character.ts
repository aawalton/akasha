import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kevin = {
  id: "01a0b70b-67d2-7d65-b46b-9262c179c2d8",
  type: "page-type/world-character",
  slug: "kevin",
  title: "Kevin",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 784,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
