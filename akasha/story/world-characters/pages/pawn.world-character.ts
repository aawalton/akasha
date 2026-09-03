import type { WorldCharacter } from "../world-character.page-type.ts"

export const pawn = {
  id: "01a06580-2495-7b0d-aecc-ce0dfdbe84b9",
  pageTypeSlug: "world-character",
  slug: "pawn",
  title: "Pawn",
  worldSlug: "the-wandering-inn",
  maxLevel: 44,
  eventCount: 11,
  firstChapter: 103,
  lastChapter: 809,
} as const satisfies WorldCharacter
