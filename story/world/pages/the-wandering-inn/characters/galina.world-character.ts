import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const galina = {
  id: "01a0b70a-8fbd-7802-9068-b78af1231ac4",
  type: "page-type/world-character",
  slug: "galina",
  title: "Galina",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 109,
  lastChapter: 441,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:57.821Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
