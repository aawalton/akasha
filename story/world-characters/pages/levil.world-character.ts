import type { WorldCharacter } from "../world-character.page-type.ts"

export const levil = {
  id: "01a06580-2494-7e73-930c-ab5a8006ead2",
  pageTypeSlug: "world-character",
  slug: "levil",
  title: "Levil",
  worldSlug: "the-wandering-inn",
  maxLevel: 25,
  eventCount: 2,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
