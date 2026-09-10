import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const nollesc = {
  id: "01a06580-2495-7e91-b1f3-1597b175ac2f",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "nollesc",
  title: "Nollesc",
  world: "the-wandering-inn",
  maxLevel: 31,
  eventCount: 1,
  firstChapter: 655,
  lastChapter: 655,
} as const satisfies WorldCharacter
