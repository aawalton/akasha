import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const magnus = {
  id: "01a0b70b-97fc-7c55-a1a5-95ab6b19ad6b",
  type: "page-type/world-character",
  slug: "magnus",
  title: "Magnus",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 64,
  lastChapter: 64,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:05.468Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
