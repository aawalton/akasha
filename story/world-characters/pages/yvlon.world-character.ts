import type { WorldCharacter } from "../world-character.page-type.ts"

export const yvlon = {
  id: "01a06580-2495-7e40-9c6d-e2dbf8b8f5d9",
  pageTypeSlug: "world-character",
  slug: "yvlon",
  title: "Yvlon",
  worldSlug: "the-wandering-inn",
  maxLevel: 45,
  eventCount: 15,
  firstChapter: 385,
  lastChapter: 733,
} as const satisfies WorldCharacter
