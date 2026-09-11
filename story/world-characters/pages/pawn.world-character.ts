import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const pawn = {
  id: "01a06580-2495-7b0d-aecc-ce0dfdbe84b9",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "pawn",
  title: "Pawn",
  world: "the-wandering-inn",
  maxLevel: 44,
  eventCount: 11,
  firstChapter: 103,
  lastChapter: 809,
} as const satisfies WorldCharacter
