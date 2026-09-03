import type { WorldCharacter } from "../world-character.page-type.ts"

export const normenCallsten = {
  id: "01a06580-2495-75b4-ae05-a5fdf3ca94e7",
  pageTypeSlug: "world-character",
  slug: "normen-callsten",
  title: "Normen",
  worldSlug: "the-wandering-inn",
  maxLevel: 27,
  eventCount: 2,
  firstChapter: 715,
  lastChapter: 715,
} as const satisfies WorldCharacter
