import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const velan = {
  id: "01a0b70d-8a64-7d16-8d1d-5544ad2e2048",
  type: "page-type/world-character",
  slug: "velan",
  title: "the Goblin King",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 157,
  lastChapter: 729,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:13.060Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
