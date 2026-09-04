import type { WorldCharacter } from "../world-character.page-type.ts"

export const snapjaw = {
  id: "01a06580-2495-72da-aa73-4c4e3caf741d",
  pageTypeSlug: "world-character",
  slug: "snapjaw",
  title: "Snapjaw",
  worldSlug: "the-wandering-inn",
  maxLevel: 31,
  eventCount: 7,
  firstChapter: 532,
  lastChapter: 532,
} as const satisfies WorldCharacter
