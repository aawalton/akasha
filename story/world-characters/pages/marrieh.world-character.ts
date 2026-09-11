import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const marrieh = {
  id: "01a06580-2494-79b1-aa53-3aaea9a78670",
  type: "world-character",
  slug: "marrieh",
  title: "Marrieh",
  world: "the-wandering-inn",
  maxLevel: 43,
  eventCount: 4,
  firstChapter: 809,
  lastChapter: 809,
} as const satisfies WorldCharacter
