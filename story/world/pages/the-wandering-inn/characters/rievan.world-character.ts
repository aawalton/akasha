import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rievan = {
  id: "01a0b70c-988d-7a60-b7d5-e246d42eab52",
  type: "page-type/world-character",
  slug: "rievan",
  title: "Rievan Forstrom",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 159,
  lastChapter: 161,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:11.149Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
