import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tom = {
  id: "01a06580-2495-74f3-acfb-45ed4eaa7a6d",
  type: "page-type/world-character",
  slug: "tom",
  title: "Tom",
  world: "world/the-wandering-inn",
  maxLevel: 24,
  eventCount: 5,
  firstChapter: 97,
  lastChapter: 625,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
