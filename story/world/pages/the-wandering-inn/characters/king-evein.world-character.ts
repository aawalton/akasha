import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kingEvein = {
  id: "01a0b70b-6b7c-7bda-9dd0-fc9e12c728a0",
  type: "page-type/world-character",
  slug: "king-evein",
  title: "Evein",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 712,
  lastChapter: 712,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:54.076Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
