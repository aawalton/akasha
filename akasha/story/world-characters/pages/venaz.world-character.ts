import type { WorldCharacter } from "../world-character.page-type.ts"

export const venaz = {
  id: "01a06580-2495-7cb0-b614-b7d1c864788f",
  pageTypeSlug: "world-character",
  slug: "venaz",
  title: "Venaz",
  worldSlug: "the-wandering-inn",
  eventCount: 1,
  firstChapter: 635,
  lastChapter: 635,
} as const satisfies WorldCharacter
