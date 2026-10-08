import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blackMage = {
  id: "01a0b707-8668-7607-ac56-8e4f35bc3a8c",
  type: "page-type/world-character",
  slug: "black-mage",
  title: "BlackMage",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:38.824Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
