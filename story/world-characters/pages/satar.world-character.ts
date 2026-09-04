import type { WorldCharacter } from "../world-character.page-type.ts"

export const satar = {
  id: "01a06580-2495-7036-95a2-fadb68f43e24",
  pageTypeSlug: "world-character",
  slug: "satar",
  title: "Satar",
  worldSlug: "the-wandering-inn",
  maxLevel: 25,
  eventCount: 10,
  firstChapter: 564,
  lastChapter: 565,
} as const satisfies WorldCharacter
