import type { WorldCharacter } from "../world-character.page-type.ts"

export const redscar = {
  id: "01a06580-2495-7996-88ea-047d800a97c1",
  pageTypeSlug: "world-character",
  slug: "redscar",
  title: "Redscar",
  worldSlug: "the-wandering-inn",
  maxLevel: 52,
  eventCount: 4,
  firstChapter: 752,
  lastChapter: 752,
} as const satisfies WorldCharacter
