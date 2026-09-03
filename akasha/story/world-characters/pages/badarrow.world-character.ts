import type { WorldCharacter } from "../world-character.page-type.ts"

export const badarrow = {
  id: "01a06580-2494-7ef7-a18c-8584e4cd9ecb",
  pageTypeSlug: "world-character",
  slug: "badarrow",
  title: "Badarrow",
  worldSlug: "the-wandering-inn",
  maxLevel: 25,
  eventCount: 3,
  firstChapter: 283,
  lastChapter: 283,
} as const satisfies WorldCharacter
