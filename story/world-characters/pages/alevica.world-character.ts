import type { WorldCharacter } from "../world-character.page-type.ts"

export const alevica = {
  id: "01a06580-2493-7cc3-ab41-6c7dd177bc8b",
  pageTypeSlug: "world-character",
  slug: "alevica",
  title: "Alevica",
  worldSlug: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 8,
  firstChapter: 714,
  lastChapter: 715,
} as const satisfies WorldCharacter
