import type { WorldCharacter } from "../world-character.page-type.ts"

export const gothica = {
  id: "01a06580-2494-7690-a8b5-0c37549f50ed",
  pageTypeSlug: "world-character",
  slug: "gothica",
  title: "Gothica",
  worldSlug: "the-wandering-inn",
  maxLevel: 8,
  eventCount: 7,
  firstChapter: 532,
  lastChapter: 532,
} as const satisfies WorldCharacter
