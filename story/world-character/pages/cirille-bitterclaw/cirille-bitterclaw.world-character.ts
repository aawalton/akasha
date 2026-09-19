import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cirilleBitterclaw = {
  id: "01a06580-2494-7782-8e50-3e35901ab5c4",
  type: "page-type/world-character",
  slug: "cirille-bitterclaw",
  title: "Cirille Bitterclaw",
  world: "world/the-wandering-inn",
  maxLevel: 33,
  eventCount: 2,
  firstChapter: 215,
  lastChapter: 437,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
