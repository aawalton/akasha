import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const bethScastein = {
  id: "01a06580-2494-7bce-8d75-a18e916238bd",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "beth-scastein",
  title: "Elizabeth Scastein",
  world: "the-wandering-inn",
  maxLevel: 14,
  eventCount: 15,
  firstChapter: 643,
  lastChapter: 643,
} as const satisfies WorldCharacter
