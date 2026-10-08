import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const salvia = {
  id: "01a0b70c-abe8-767a-9e3a-b915afc3e532",
  type: "page-type/world-character",
  slug: "salvia",
  title: "Salvia",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 233,
  lastChapter: 688,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:16.104Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
