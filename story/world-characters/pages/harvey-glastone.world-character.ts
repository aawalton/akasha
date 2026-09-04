import type { WorldCharacter } from "../world-character.page-type.ts"

export const harveyGlastone = {
  id: "01a06580-2494-7e5b-8a58-a65199e4ad85",
  pageTypeSlug: "world-character",
  slug: "harvey-glastone",
  title: "Harvey Glastone",
  worldSlug: "the-wandering-inn",
  maxLevel: 40,
  eventCount: 2,
  firstChapter: 807,
  lastChapter: 807,
} as const satisfies WorldCharacter
