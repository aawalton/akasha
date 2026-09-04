import type { WorldCharacter } from "../world-character.page-type.ts"

export const cirilleBitterclaw = {
  id: "01a06580-2494-7782-8e50-3e35901ab5c4",
  pageTypeSlug: "world-character",
  slug: "cirille-bitterclaw",
  title: "Cirille",
  worldSlug: "the-wandering-inn",
  maxLevel: 33,
  eventCount: 2,
  firstChapter: 438,
  lastChapter: 438,
} as const satisfies WorldCharacter
