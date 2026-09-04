import type { WorldCharacter } from "../world-character.page-type.ts"

export const piscesJealnet = {
  id: "01a06580-2495-7150-bac5-aebe0fbe2cc0",
  pageTypeSlug: "world-character",
  slug: "pisces-jealnet",
  title: "Pisces",
  worldSlug: "the-wandering-inn",
  maxLevel: 38,
  eventCount: 10,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
