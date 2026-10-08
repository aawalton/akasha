import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lamont = {
  id: "01a0b70b-7ab6-7d83-b152-6803afe00c18",
  type: "page-type/world-character",
  slug: "lamont",
  title: "Lamont",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 311,
  lastChapter: 591,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:57.974Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
