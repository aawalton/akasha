import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const sebornSailwinds = {
  id: "01a06580-2495-7d21-b595-52fa5638ccf5",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "seborn-sailwinds",
  title: "Seborn",
  world: "the-wandering-inn",
  eventCount: 1,
  firstChapter: 787,
  lastChapter: 787,
} as const satisfies WorldCharacter
