import type { WorldCharacter } from "../world-character.page-type.ts"

export const garry = {
  id: "01a06580-2494-7e3f-986c-3f39b2b99338",
  pageTypeSlug: "world-character",
  slug: "garry",
  title: "Garry",
  worldSlug: "the-wandering-inn",
  maxLevel: 46,
  eventCount: 39,
  firstChapter: 631,
  lastChapter: 805,
} as const satisfies WorldCharacter
