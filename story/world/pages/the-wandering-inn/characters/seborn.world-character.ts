import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const seborn = {
  id: "01a0b70c-ed29-7786-8936-02603ee631fa",
  type: "page-type/world-character",
  slug: "seborn",
  title: "Seborn",
  world: "world/the-wandering-inn",
  appearanceCount: 30,
  firstChapter: 96,
  lastChapter: 810,
  characterClaims: "jsonl",
  aliasOf: "world-character/seborn-sailwinds",
  createdAt: "2026-09-19T00:24:32.809Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
