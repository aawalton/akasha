import type { WorldCharacter } from "../world-character.page-type.ts"

export const rags = {
  id: "01a06580-2495-718b-aeda-9badee68b180",
  pageTypeSlug: "world-character",
  slug: "rags",
  title: "Chieftain Rags",
  worldSlug: "the-wandering-inn",
  maxLevel: 35,
  eventCount: 27,
  firstChapter: 83,
  lastChapter: 613,
} as const satisfies WorldCharacter
