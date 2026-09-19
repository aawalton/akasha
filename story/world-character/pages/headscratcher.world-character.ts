import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const headscratcher = {
  id: "01a06580-2494-7b0c-822d-5b4957abf79c",
  type: "page-type/world-character",
  slug: "headscratcher",
  title: "Headscratcher",
  world: "world/the-wandering-inn",
  maxLevel: 20,
  eventCount: 4,
  firstChapter: 146,
  lastChapter: 740,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
