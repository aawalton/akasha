import type { WorldCharacter } from "../world-character.page-type.ts"

export const seraphel = {
  id: "01a06580-2495-7b69-9ddc-edac330b6afc",
  pageTypeSlug: "world-character",
  slug: "seraphel",
  title: "Seraphel",
  worldSlug: "the-wandering-inn",
  maxLevel: 35,
  eventCount: 3,
  firstChapter: 795,
  lastChapter: 795,
} as const satisfies WorldCharacter
