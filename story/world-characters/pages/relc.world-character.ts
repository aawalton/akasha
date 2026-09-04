import type { WorldCharacter } from "../world-character.page-type.ts"

export const relc = {
  id: "01a06580-2495-72cf-a6d1-6ece0a71e02a",
  pageTypeSlug: "world-character",
  slug: "relc",
  title: "Relc",
  worldSlug: "the-wandering-inn",
  maxLevel: 40,
  eventCount: 9,
  firstChapter: 430,
  lastChapter: 810,
} as const satisfies WorldCharacter
