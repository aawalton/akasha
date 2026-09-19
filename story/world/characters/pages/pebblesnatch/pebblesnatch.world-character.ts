import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pebblesnatch = {
  id: "01a06580-2495-74f1-8c85-ff0bab414851",
  type: "page-type/world-character",
  slug: "pebblesnatch",
  title: "Pebblesnatch",
  world: "world/the-wandering-inn",
  maxLevel: 10,
  eventCount: 9,
  firstChapter: 278,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
