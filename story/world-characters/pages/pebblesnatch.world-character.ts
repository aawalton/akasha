import type { WorldCharacter } from "../world-character.page-type.ts"

export const pebblesnatch = {
  id: "01a06580-2495-74f1-8c85-ff0bab414851",
  pageTypeSlug: "world-character",
  slug: "pebblesnatch",
  title: "Pebblesnatch",
  worldSlug: "the-wandering-inn",
  maxLevel: 10,
  eventCount: 9,
  firstChapter: 395,
  lastChapter: 395,
} as const satisfies WorldCharacter
