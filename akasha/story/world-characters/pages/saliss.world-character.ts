import type { WorldCharacter } from "../world-character.page-type.ts"

export const saliss = {
  id: "01a06580-2495-7632-8ca4-54ddccefbfc2",
  pageTypeSlug: "world-character",
  slug: "saliss",
  title: "Saliss",
  worldSlug: "the-wandering-inn",
  maxLevel: 56,
  eventCount: 2,
  firstChapter: 697,
  lastChapter: 697,
} as const satisfies WorldCharacter
