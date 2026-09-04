import type { WorldCharacter } from "../world-character.page-type.ts"

export const ulvama = {
  id: "01a06580-2495-7f68-a839-c88ba1cbc32f",
  pageTypeSlug: "world-character",
  slug: "ulvama",
  title: "Ulvama",
  worldSlug: "the-wandering-inn",
  maxLevel: 39,
  eventCount: 10,
  firstChapter: 532,
  lastChapter: 805,
} as const satisfies WorldCharacter
