import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const soldiers = {
  id: "01a0b70d-083a-7b7d-87ef-5823f8f02b5d",
  type: "page-type/world-character",
  slug: "soldiers",
  title: "Soldiers",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 147,
  lastChapter: 148,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:39.738Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
