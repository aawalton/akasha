import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const levil = {
  id: "01a06580-2494-7e73-930c-ab5a8006ead2",
  type: "page-type/world-character",
  slug: "levil",
  title: "Levil",
  world: "world/the-wandering-inn",
  maxLevel: 25,
  eventCount: 2,
  firstChapter: 311,
  lastChapter: 377,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
