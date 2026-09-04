import type { WorldCharacter } from "../world-character.page-type.ts"

export const infinitypear = {
  id: "01a06580-2494-7d5e-aadc-57272bd10149",
  pageTypeSlug: "world-character",
  slug: "infinitypear",
  title: "Infinitypear",
  worldSlug: "the-wandering-inn",
  maxLevel: 11,
  eventCount: 11,
  firstChapter: 521,
  lastChapter: 622,
} as const satisfies WorldCharacter
