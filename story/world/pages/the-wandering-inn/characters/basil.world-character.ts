import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const basil = {
  id: "01a0b707-7b90-721b-a3c0-37097484efff",
  type: "page-type/world-character",
  slug: "basil",
  title: "Basil",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:36.048Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
