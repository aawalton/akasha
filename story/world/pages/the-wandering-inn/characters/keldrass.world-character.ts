import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const keldrass = {
  id: "01a0b70b-619c-72c0-8f61-950a34ce525f",
  type: "page-type/world-character",
  slug: "keldrass",
  title: "Keldrass",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 289,
  lastChapter: 364,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:51.548Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
