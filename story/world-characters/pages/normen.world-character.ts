import type { WorldCharacter } from "../world-character.page-type.ts"

export const normen = {
  id: "01a06580-2495-7d3f-8d6b-03c39fe67e48",
  pageTypeSlug: "world-character",
  slug: "normen",
  title: "Normen",
  worldSlug: "the-wandering-inn",
  maxLevel: 30,
  eventCount: 11,
  firstChapter: 650,
  lastChapter: 650,
} as const satisfies WorldCharacter
