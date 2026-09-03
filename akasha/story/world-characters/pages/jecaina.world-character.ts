import type { WorldCharacter } from "../world-character.page-type.ts"

export const jecaina = {
  id: "01a06580-2494-70b5-ba9c-d071203e5e01",
  pageTypeSlug: "world-character",
  slug: "jecaina",
  title: "Jecaina",
  worldSlug: "the-wandering-inn",
  maxLevel: 29,
  eventCount: 8,
  firstChapter: 492,
  lastChapter: 492,
} as const satisfies WorldCharacter
