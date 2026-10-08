import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const emperorOfSands = {
  id: "01a0b70a-6ca4-7bac-bd63-d933ee38bc0f",
  type: "page-type/world-character",
  slug: "emperor-of-sands",
  title: "Emperor of Sands",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 242,
  lastChapter: 632,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:48.836Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
