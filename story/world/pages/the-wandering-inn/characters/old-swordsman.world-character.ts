import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const oldSwordsman = {
  id: "01a0b70c-1620-79fb-921e-f9d248f8382b",
  type: "page-type/world-character",
  slug: "old-swordsman",
  title: "an old swordsman",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 12,
  lastChapter: 12,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:37.760Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
