import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const highMage = {
  id: "01a0b70a-fc03-73a9-9790-804bc86c64fd",
  type: "page-type/world-character",
  slug: "high-mage",
  title: "the High Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 12,
  lastChapter: 12,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:25.539Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
