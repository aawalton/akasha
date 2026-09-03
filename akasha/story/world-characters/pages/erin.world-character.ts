import type { WorldCharacter } from "../world-character.page-type.ts"

export const erin = {
  id: "01a06580-2494-765b-b42d-40f9c2d72f04",
  pageTypeSlug: "world-character",
  slug: "erin",
  title: "Erin",
  worldSlug: "the-wandering-inn",
  maxLevel: 55,
  eventCount: 140,
  firstChapter: 1,
  lastChapter: 805,
} as const satisfies WorldCharacter
