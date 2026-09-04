import type { WorldCharacter } from "../world-character.page-type.ts"

export const valeterisa = {
  id: "01a06580-2495-760b-8c88-7ed4d37e1fd8",
  pageTypeSlug: "world-character",
  slug: "valeterisa",
  title: "Archmage Valeterisa",
  worldSlug: "the-wandering-inn",
  maxLevel: 54,
  eventCount: 4,
  firstChapter: 607,
  lastChapter: 607,
} as const satisfies WorldCharacter
