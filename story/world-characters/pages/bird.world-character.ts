import type { WorldCharacter } from "../world-character.page-type.ts"

export const bird = {
  id: "01a06580-2494-7871-b674-a99406200efd",
  pageTypeSlug: "world-character",
  slug: "bird",
  title: "Bird",
  worldSlug: "the-wandering-inn",
  maxLevel: 42,
  eventCount: 29,
  firstChapter: 274,
  lastChapter: 669,
} as const satisfies WorldCharacter
