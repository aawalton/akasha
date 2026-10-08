import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dalimont = {
  id: "01a0b70a-0e86-7f47-8a78-4d0cf0154e3e",
  type: "page-type/world-character",
  slug: "dalimont",
  title: "Ser Dalimont",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 540,
  lastChapter: 740,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:24.742Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
