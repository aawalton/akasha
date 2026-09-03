import type { WorldCharacter } from "../world-character.page-type.ts"

export const vandum = {
  id: "01a06580-2495-712c-a983-628df7c1d48a",
  pageTypeSlug: "world-character",
  slug: "vandum",
  title: "Vandum",
  worldSlug: "the-wandering-inn",
  maxLevel: 50,
  eventCount: 4,
  firstChapter: 636,
  lastChapter: 636,
} as const satisfies WorldCharacter
