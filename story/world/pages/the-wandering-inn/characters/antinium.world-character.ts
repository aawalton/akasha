import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const antinium = {
  id: "01a0b707-6f1d-7c32-b07b-4e46d620a6c5",
  type: "page-type/world-character",
  slug: "antinium",
  title: "the Antinium",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 110,
  lastChapter: 110,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:32.861Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
