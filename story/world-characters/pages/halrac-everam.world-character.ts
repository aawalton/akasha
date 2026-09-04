import type { WorldCharacter } from "../world-character.page-type.ts"

export const halracEveram = {
  id: "01a06580-2494-7180-8da2-6f5bc8763993",
  pageTypeSlug: "world-character",
  slug: "halrac-everam",
  title: "Halrac",
  worldSlug: "the-wandering-inn",
  maxLevel: 36,
  eventCount: 8,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
