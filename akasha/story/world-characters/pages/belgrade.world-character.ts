import type { WorldCharacter } from "../world-character.page-type.ts"

export const belgrade = {
  id: "01a06580-2494-7cdd-accf-63dafbc69ed4",
  pageTypeSlug: "world-character",
  slug: "belgrade",
  title: "Belgrade",
  worldSlug: "the-wandering-inn",
  maxLevel: 33,
  eventCount: 5,
  firstChapter: 561,
  lastChapter: 561,
} as const satisfies WorldCharacter
