import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calruz = {
  id: "01a0b707-9087-7a18-a38f-3e99d3bdddeb",
  type: "page-type/world-character",
  slug: "calruz",
  title: "Calruz",
  world: "world/the-wandering-inn",
  appearanceCount: 42,
  firstChapter: 29,
  lastChapter: 791,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:41.415Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
