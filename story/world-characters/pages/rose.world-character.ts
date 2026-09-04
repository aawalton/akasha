import type { WorldCharacter } from "../world-character.page-type.ts"

export const rose = {
  id: "01a06580-2495-7938-87c3-0624c314cc9b",
  pageTypeSlug: "world-character",
  slug: "rose",
  title: "Rose",
  worldSlug: "the-wandering-inn",
  maxLevel: 4,
  eventCount: 4,
  firstChapter: 697,
  lastChapter: 697,
} as const satisfies WorldCharacter
