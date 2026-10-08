import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pestrom = {
  id: "01a0b70c-68df-7c42-85d7-5511e7268a0a",
  type: "page-type/world-character",
  slug: "pestrom",
  title: "Pestrom",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 42,
  lastChapter: 42,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:58.943Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
