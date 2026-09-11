import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const goblinSlayer = {
  id: "01a06580-2494-7311-bead-bbef89c556f9",
  type: "world-character",
  slug: "goblin-slayer",
  title: "Ser Solstice",
  world: "the-wandering-inn",
  maxLevel: 28,
  eventCount: 5,
  firstChapter: 378,
  lastChapter: 378,
} as const satisfies WorldCharacter
