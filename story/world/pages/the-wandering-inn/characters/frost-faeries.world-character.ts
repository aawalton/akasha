import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const frostFaeries = {
  id: "01a0b70a-8d8f-7598-bde8-ba5e64a7299f",
  type: "page-type/world-character",
  slug: "frost-faeries",
  title: "Frost Faeries",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 100,
  lastChapter: 137,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:57.263Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
