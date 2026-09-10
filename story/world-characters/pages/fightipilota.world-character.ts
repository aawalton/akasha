import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const fightipilota = {
  id: "01a06580-2494-72f5-9726-4cc56b85fe71",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "fightipilota",
  title: "Fightipilota",
  world: "the-wandering-inn",
  maxLevel: 20,
  eventCount: 25,
  firstChapter: 717,
  lastChapter: 818,
} as const satisfies WorldCharacter
