import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const fierre = {
  id: "01a06580-2494-7123-b25b-4065b4caac03",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "fierre",
  title: "Fierre",
  world: "the-wandering-inn",
  maxLevel: 3,
  eventCount: 2,
  firstChapter: 467,
  lastChapter: 467,
} as const satisfies WorldCharacter
