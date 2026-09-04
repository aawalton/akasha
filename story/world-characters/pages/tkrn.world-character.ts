import type { WorldCharacter } from "../world-character.page-type.ts"

export const tkrn = {
  id: "01a06580-2495-7ca0-a021-aa66911c1a42",
  pageTypeSlug: "world-character",
  slug: "tkrn",
  title: "Tkrn",
  worldSlug: "the-wandering-inn",
  maxLevel: 21,
  eventCount: 6,
  firstChapter: 566,
  lastChapter: 566,
} as const satisfies WorldCharacter
