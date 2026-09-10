import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const geneva = {
  id: "01a06580-2494-7d5e-8f29-212ba43389ec",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "geneva",
  title: "Geneva",
  world: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 5,
  firstChapter: 131,
  lastChapter: 423,
} as const satisfies WorldCharacter
