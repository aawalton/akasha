import type { WorldCharacter } from "../world-character.page-type.ts"

export const joseph = {
  id: "01a06580-2494-77c4-a003-b6b70aa179ea",
  pageTypeSlug: "world-character",
  slug: "joseph",
  title: "Joseph",
  worldSlug: "the-wandering-inn",
  maxLevel: 16,
  eventCount: 13,
  firstChapter: 427,
  lastChapter: 500,
} as const satisfies WorldCharacter
