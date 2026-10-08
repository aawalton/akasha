import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const toriska = {
  id: "01a0b70d-6e5e-77f9-bca1-690b6b7c7062",
  type: "page-type/world-character",
  slug: "toriska",
  title: "Toriska",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 30,
  lastChapter: 58,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:05.886Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
