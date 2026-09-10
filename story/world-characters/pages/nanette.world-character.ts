import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const nanette = {
  id: "01a06580-2495-7115-8b91-58a7fc039e4b",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "nanette",
  title: "Nanette",
  world: "the-wandering-inn",
  maxLevel: 4,
  eventCount: 14,
  firstChapter: 672,
  lastChapter: 818,
} as const satisfies WorldCharacter
