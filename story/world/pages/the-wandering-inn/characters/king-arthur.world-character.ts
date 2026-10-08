import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kingArthur = {
  id: "01a0b70b-6b2e-721a-9255-c6915cc6fa9a",
  type: "page-type/world-character",
  slug: "king-arthur",
  title: "King Arthur",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 480,
  lastChapter: 480,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:53.998Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
