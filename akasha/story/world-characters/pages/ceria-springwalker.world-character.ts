import type { WorldCharacter } from "../world-character.page-type.ts"

export const ceriaSpringwalker = {
  id: "01a06580-2494-7ec7-be55-4ecdfa65a541",
  pageTypeSlug: "world-character",
  slug: "ceria-springwalker",
  title: "Ceria",
  worldSlug: "the-wandering-inn",
  maxLevel: 40,
  eventCount: 23,
  firstChapter: 506,
  lastChapter: 735,
} as const satisfies WorldCharacter
