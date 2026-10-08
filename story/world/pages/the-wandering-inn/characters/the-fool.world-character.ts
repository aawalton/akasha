import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theFool = {
  id: "01a0b70d-1d1e-74f5-b4ae-990ba7fc0a0f",
  type: "page-type/world-character",
  slug: "the-fool",
  title: "Fool",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 216,
  lastChapter: 217,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:45.086Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
