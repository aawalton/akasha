import type { WorldCharacter } from "../world-character.page-type.ts"

export const raeltLeysars = {
  id: "01a06580-2495-7662-9759-276a2ab14800",
  pageTypeSlug: "world-character",
  slug: "raelt-leysars",
  title: "Raelt Leysars",
  worldSlug: "the-wandering-inn",
  maxLevel: 35,
  eventCount: 10,
  firstChapter: 410,
  lastChapter: 410,
} as const satisfies WorldCharacter
