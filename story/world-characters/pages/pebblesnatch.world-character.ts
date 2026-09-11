import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const pebblesnatch = {
  id: "01a06580-2495-74f1-8c85-ff0bab414851",
  type: "world-character",
  slug: "pebblesnatch",
  title: "Pebblesnatch",
  world: "the-wandering-inn",
  maxLevel: 10,
  eventCount: 9,
  firstChapter: 395,
  lastChapter: 395,
} as const satisfies WorldCharacter
