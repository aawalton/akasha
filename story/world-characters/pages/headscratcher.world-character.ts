import type { WorldCharacter } from "../world-character.page-type.ts"

export const headscratcher = {
  id: "01a06580-2494-7b0c-822d-5b4957abf79c",
  pageTypeSlug: "world-character",
  slug: "headscratcher",
  title: "Headscratcher",
  worldSlug: "the-wandering-inn",
  maxLevel: 20,
  eventCount: 4,
  firstChapter: 276,
  lastChapter: 276,
} as const satisfies WorldCharacter
