import type { WorldCharacter } from "../world-character.page-type.ts"

export const goblinSlayer = {
  id: "01a06580-2494-7311-bead-bbef89c556f9",
  pageTypeSlug: "world-character",
  slug: "goblin-slayer",
  title: "Ser Solstice",
  worldSlug: "the-wandering-inn",
  maxLevel: 28,
  eventCount: 5,
  firstChapter: 378,
  lastChapter: 378,
} as const satisfies WorldCharacter
