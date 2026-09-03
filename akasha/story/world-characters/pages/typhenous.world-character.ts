import type { WorldCharacter } from "../world-character.page-type.ts"

export const typhenous = {
  id: "01a06580-2495-7777-b055-2c5cc0746f9e",
  pageTypeSlug: "world-character",
  slug: "typhenous",
  title: "Typhenous",
  worldSlug: "the-wandering-inn",
  maxLevel: 28,
  eventCount: 2,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
