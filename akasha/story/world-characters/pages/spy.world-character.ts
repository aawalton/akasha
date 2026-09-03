import type { WorldCharacter } from "../world-character.page-type.ts"

export const spy = {
  id: "01a06580-2495-7263-a2be-230b894bffd3",
  pageTypeSlug: "world-character",
  slug: "spy",
  title: "unknown spy",
  worldSlug: "the-wandering-inn",
  maxLevel: 30,
  eventCount: 6,
  firstChapter: 654,
  lastChapter: 654,
} as const satisfies WorldCharacter
