import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eddy = {
  id: "01a0b70a-22e5-7066-87f1-95431123f518",
  type: "page-type/world-character",
  slug: "eddy",
  title: "Eddy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 215,
  lastChapter: 215,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:29.957Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
