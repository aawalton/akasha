import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kingArthur = {
  id: "01a0b70b-6b2e-721a-9255-c6915cc6fa9a",
  type: "page-type/world-character",
  slug: "king-arthur",
  title: "King Arthur",
  world: "world/the-wandering-inn",
  firstChapter: 480,
  lastChapter: 480,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
