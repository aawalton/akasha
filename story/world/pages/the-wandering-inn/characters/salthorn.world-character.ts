import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const salthorn = {
  id: "01a0b70c-ab74-70a2-8d2a-300aab4be500",
  type: "page-type/world-character",
  slug: "salthorn",
  title: "Salthorn",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 402,
  lastChapter: 636,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:15.988Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
