import type { WorldCharacter } from "../world-character.page-type.ts"

export const zevara = {
  id: "01a06580-2495-7afc-97ce-f7f01120a61b",
  pageTypeSlug: "world-character",
  slug: "zevara",
  title: "Watch Captain Zevara",
  worldSlug: "the-wandering-inn",
  maxLevel: 38,
  eventCount: 12,
  firstChapter: 779,
  lastChapter: 779,
} as const satisfies WorldCharacter
