import type { WorldCharacter } from "../world-character.page-type.ts"

export const artur = {
  id: "01a06580-2493-743d-badb-3f9020377317",
  pageTypeSlug: "world-character",
  slug: "artur",
  title: "Artur",
  worldSlug: "the-wandering-inn",
  maxLevel: 17,
  eventCount: 11,
  firstChapter: 561,
  lastChapter: 562,
} as const satisfies WorldCharacter
