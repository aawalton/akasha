import type { WorldCharacter } from "../world-character.page-type.ts"

export const theophilus = {
  id: "01a06580-2495-7912-9dc8-03bab2814000",
  pageTypeSlug: "world-character",
  slug: "theophilus",
  title: "Theophilus",
  worldSlug: "the-wandering-inn",
  maxLevel: 20,
  eventCount: 9,
  firstChapter: 562,
  lastChapter: 562,
} as const satisfies WorldCharacter
