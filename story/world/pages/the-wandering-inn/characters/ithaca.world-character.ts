import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ithaca = {
  id: "01a0b70b-15ae-7e5e-a5cb-946f5233ee7b",
  type: "page-type/world-character",
  slug: "ithaca",
  title: "Ithaca",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:32.110Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
