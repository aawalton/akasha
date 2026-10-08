import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eloise = {
  id: "01a0b70a-6651-7a56-8648-e642d431da46",
  type: "page-type/world-character",
  slug: "eloise",
  title: "Eloise",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  firstChapter: 351,
  lastChapter: 463,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:47.217Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
