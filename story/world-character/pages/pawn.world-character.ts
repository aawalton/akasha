import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pawn = {
  id: "01a06580-2495-7b0d-aecc-ce0dfdbe84b9",
  type: "world-character",
  slug: "pawn",
  title: "Pawn",
  world: "world/the-wandering-inn",
  maxLevel: 44,
  eventCount: 11,
  firstChapter: 103,
  lastChapter: 809,
} as const satisfies WorldCharacter
