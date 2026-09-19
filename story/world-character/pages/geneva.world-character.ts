import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const geneva = {
  id: "01a06580-2494-7d5e-8f29-212ba43389ec",
  type: "page-type/world-character",
  slug: "geneva",
  title: "Geneva",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 5,
  firstChapter: 131,
  lastChapter: 699,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
