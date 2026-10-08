import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pawn = {
  id: "01a06580-2495-7b0d-aecc-ce0dfdbe84b9",
  type: "page-type/world-character",
  slug: "pawn",
  title: "Pawn",
  world: "world/the-wandering-inn",
  appearanceCount: 75,
  eventCount: 11,
  firstChapter: 33,
  lastChapter: 809,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
