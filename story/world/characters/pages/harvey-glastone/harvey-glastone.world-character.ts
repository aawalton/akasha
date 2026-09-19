import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const harveyGlastone = {
  id: "01a06580-2494-7e5b-8a58-a65199e4ad85",
  type: "page-type/world-character",
  slug: "harvey-glastone",
  title: "Harvey Glastone",
  world: "world/the-wandering-inn",
  maxLevel: 40,
  eventCount: 2,
  firstChapter: 807,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
