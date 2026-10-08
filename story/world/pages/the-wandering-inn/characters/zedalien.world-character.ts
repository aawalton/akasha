import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zedalien = {
  id: "01a0b70d-e97c-7845-b421-8cb2e88dd66d",
  type: "page-type/world-character",
  slug: "zedalien",
  title: "Zedalien",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 624,
  lastChapter: 791,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:37.404Z",
  updatedAt: "2026-09-22T13:09:57.000Z",
} as const satisfies WorldCharacter
