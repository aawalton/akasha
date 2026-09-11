import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const gothica = {
  id: "01a06580-2494-7690-a8b5-0c37549f50ed",
  type: "world-character",
  slug: "gothica",
  title: "Gothica",
  world: "the-wandering-inn",
  maxLevel: 8,
  eventCount: 7,
  firstChapter: 532,
  lastChapter: 532,
} as const satisfies WorldCharacter
