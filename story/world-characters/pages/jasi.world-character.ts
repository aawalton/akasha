import type { WorldCharacter } from "../world-character.page-type.ts"

export const jasi = {
  id: "01a06580-2494-74e7-a5ee-e93546e37102",
  pageTypeSlug: "world-character",
  slug: "jasi",
  title: "Jasi",
  worldSlug: "the-wandering-inn",
  maxLevel: 25,
  eventCount: 4,
  firstChapter: 382,
  lastChapter: 382,
} as const satisfies WorldCharacter
