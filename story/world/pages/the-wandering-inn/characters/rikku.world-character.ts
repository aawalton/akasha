import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rikku = {
  id: "01a0b70c-9926-7d8c-8e8f-000eba398146",
  type: "page-type/world-character",
  slug: "rikku",
  title: "Rikku",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 85,
  lastChapter: 85,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:11.302Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
