import type { WorldCharacter } from "../world-character.page-type.ts"

export const dureneFaerise = {
  id: "01a06580-2494-7ac1-929a-68dcb51fec94",
  pageTypeSlug: "world-character",
  slug: "durene-faerise",
  title: "Durene",
  worldSlug: "the-wandering-inn",
  maxLevel: 3,
  eventCount: 5,
  firstChapter: 713,
  lastChapter: 713,
} as const satisfies WorldCharacter
