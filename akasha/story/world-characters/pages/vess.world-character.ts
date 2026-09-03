import type { WorldCharacter } from "../world-character.page-type.ts"

export const vess = {
  id: "01a06580-2495-71d2-9f62-69a8829b544a",
  pageTypeSlug: "world-character",
  slug: "vess",
  title: "Vess",
  worldSlug: "the-wandering-inn",
  maxLevel: 12,
  eventCount: 4,
  firstChapter: 562,
  lastChapter: 562,
} as const satisfies WorldCharacter
