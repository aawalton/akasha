import type { WorldCharacter } from "../world-character.page-type.ts"

export const ulinde = {
  id: "01a06580-2495-76ca-b2e3-f799751ff084",
  pageTypeSlug: "world-character",
  slug: "ulinde",
  title: "Ulinde",
  worldSlug: "the-wandering-inn",
  maxLevel: 28,
  eventCount: 3,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
