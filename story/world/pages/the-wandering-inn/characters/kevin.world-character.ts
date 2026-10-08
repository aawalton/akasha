import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kevin = {
  id: "01a0b70b-67d2-7d65-b46b-9262c179c2d8",
  type: "page-type/world-character",
  slug: "kevin",
  title: "Kevin",
  world: "world/the-wandering-inn",
  appearanceCount: 15,
  firstChapter: 97,
  lastChapter: 784,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:53.138Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
