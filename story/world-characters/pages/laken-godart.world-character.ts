import type { WorldCharacter } from "../world-character.page-type.ts"

export const lakenGodart = {
  id: "01a06580-2494-786b-b1ff-7d1b75543a4e",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "laken-godart",
  title: "Laken",
  world: "the-wandering-inn",
  maxLevel: 37,
  eventCount: 11,
  firstChapter: 124,
  lastChapter: 714,
} as const satisfies WorldCharacter
