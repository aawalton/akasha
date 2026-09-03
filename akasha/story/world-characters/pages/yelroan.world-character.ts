import type { WorldCharacter } from "../world-character.page-type.ts"

export const yelroan = {
  id: "01a06580-2495-7302-ab80-d08ce5cf8470",
  pageTypeSlug: "world-character",
  slug: "yelroan",
  title: "Yelroan",
  worldSlug: "the-wandering-inn",
  maxLevel: 46,
  eventCount: 3,
  firstChapter: 707,
  lastChapter: 707,
} as const satisfies WorldCharacter
