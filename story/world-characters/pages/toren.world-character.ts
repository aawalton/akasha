import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const toren = {
  id: "01a06580-2495-7b2b-ab5a-0bb2b2fc4657",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "toren",
  title: "Toren",
  world: "the-wandering-inn",
  maxLevel: 47,
  eventCount: 56,
  firstChapter: 94,
  lastChapter: 772,
} as const satisfies WorldCharacter
