import type { WorldCharacter } from "../world-character.page-type.ts"

export const pekona = {
  id: "01a06580-2495-76a0-9240-9c1e564bd530",
  pageTypeSlug: "world-character",
  slug: "pekona",
  title: "Pekona",
  worldSlug: "the-wandering-inn",
  maxLevel: 2,
  eventCount: 4,
  firstChapter: 768,
  lastChapter: 768,
} as const satisfies WorldCharacter
