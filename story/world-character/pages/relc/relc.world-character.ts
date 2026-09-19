import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const relc = {
  id: "01a06580-2495-72cf-a6d1-6ece0a71e02a",
  type: "page-type/world-character",
  slug: "relc",
  title: "large drake-person with scales and tail",
  world: "world/the-wandering-inn",
  maxLevel: 40,
  eventCount: 9,
  firstChapter: 7,
  lastChapter: 810,
  characterClaims: "jsonl",
  aliasOf: "world-character/relc-grasstongue",
} as const satisfies WorldCharacter
