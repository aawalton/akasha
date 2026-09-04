import type { WorldCharacter } from "../world-character.page-type.ts"

export const eldavin = {
  id: "01a06580-2494-7ddb-abe9-0b88773932df",
  pageTypeSlug: "world-character",
  slug: "eldavin",
  title: "Eldavin",
  worldSlug: "the-wandering-inn",
  maxLevel: 16,
  eventCount: 4,
  firstChapter: 593,
  lastChapter: 674,
} as const satisfies WorldCharacter
