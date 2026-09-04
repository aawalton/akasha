import type { WorldCharacter } from "../world-character.page-type.ts"

export const kenjiroMurata = {
  id: "01a06580-2494-7bb1-863a-db7fe501fe34",
  pageTypeSlug: "world-character",
  slug: "kenjiro-murata",
  title: "Kenjiro Murata",
  worldSlug: "the-wandering-inn",
  maxLevel: 4,
  eventCount: 5,
  firstChapter: 196,
  lastChapter: 196,
} as const satisfies WorldCharacter
