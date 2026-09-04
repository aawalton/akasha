import type { WorldCharacter } from "../world-character.page-type.ts"

export const maughin = {
  id: "01a06580-2494-73d7-a70b-45fc5641e190",
  pageTypeSlug: "world-character",
  slug: "maughin",
  title: "Maughin",
  worldSlug: "the-wandering-inn",
  maxLevel: 3,
  eventCount: 6,
  firstChapter: 789,
  lastChapter: 789,
} as const satisfies WorldCharacter
