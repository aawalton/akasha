import type { WorldCharacter } from "../world-character.page-type.ts"

export const russellTMorgan = {
  id: "01a06580-2495-704d-9bd3-cedce478c8e7",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "russell-t-morgan",
  title: "Russell T. Morgan",
  world: "the-wandering-inn",
  maxLevel: 16,
  eventCount: 3,
  firstChapter: 816,
  lastChapter: 816,
} as const satisfies WorldCharacter
