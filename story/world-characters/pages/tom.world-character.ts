import type { WorldCharacter } from "../world-character.page-type.ts"

export const tom = {
  id: "01a06580-2495-74f3-acfb-45ed4eaa7a6d",
  pageTypeSlug: "world-character",
  slug: "tom",
  title: "Tom",
  worldSlug: "the-wandering-inn",
  maxLevel: 24,
  eventCount: 5,
  firstChapter: 98,
  lastChapter: 98,
} as const satisfies WorldCharacter
