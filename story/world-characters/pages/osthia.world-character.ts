import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const osthia = {
  id: "01a06580-2495-72cc-8b7a-2c008742ff51",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "osthia",
  title: "Osthia",
  world: "the-wandering-inn",
  maxLevel: 35,
  eventCount: 18,
  firstChapter: 822,
  lastChapter: 822,
} as const satisfies WorldCharacter
