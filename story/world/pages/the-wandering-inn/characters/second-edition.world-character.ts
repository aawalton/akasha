import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const secondEdition = {
  id: "01a0b70c-ef1b-7cd8-98a2-4fb3b913e313",
  type: "page-type/world-character",
  slug: "second-edition",
  title: "the Grand Design (Second Edition)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 750,
  lastChapter: 750,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:33.307Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
