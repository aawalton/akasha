import type { WorldCharacter } from "../world-character.page-type.ts"

export const laken = {
  id: "01a06580-2494-7c73-9a5c-51fec618b692",
  pageTypeSlug: "world-character",
  slug: "laken",
  title: "Laken",
  worldSlug: "the-wandering-inn",
  maxLevel: 19,
  eventCount: 21,
  firstChapter: 125,
  lastChapter: 763,
} as const satisfies WorldCharacter
