import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beniar = {
  id: "01a0b707-80db-706c-b114-de345e2faf14",
  type: "page-type/world-character",
  slug: "beniar",
  title: "Beniar",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  firstChapter: 202,
  lastChapter: 355,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:37.403Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
