import type { WorldCharacter } from "../world-character.page-type.ts"

export const ishkr = {
  id: "01a06580-2494-7ca8-bcb1-b2455a57c009",
  pageTypeSlug: "world-character",
  slug: "ishkr",
  title: "Ishkr",
  worldSlug: "the-wandering-inn",
  maxLevel: 43,
  eventCount: 7,
  firstChapter: 764,
  lastChapter: 764,
} as const satisfies WorldCharacter
