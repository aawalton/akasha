import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const stalker = {
  id: "01a0b70d-0e78-729c-b18e-48af5e33cd86",
  type: "page-type/world-character",
  slug: "stalker",
  title: "Stalker",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 284,
  lastChapter: 284,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:41.336Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
