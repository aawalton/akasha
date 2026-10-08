import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const queen = {
  id: "01a0b70c-79cd-76f0-8fc7-d5d892b0d8cd",
  type: "page-type/world-character",
  slug: "queen",
  title: "the Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 28,
  lastChapter: 28,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:03.277Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
