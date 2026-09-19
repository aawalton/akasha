import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const erin = {
  id: "01a06580-2494-765b-b42d-40f9c2d72f04",
  type: "page-type/world-character",
  slug: "erin",
  title: "Erin Solstice",
  world: "world/the-wandering-inn",
  maxLevel: 55,
  eventCount: 140,
  firstChapter: 3,
  lastChapter: 786,
  characterClaims: "jsonl",
  aliasOf: "world-character/erin-solstice",
} as const satisfies WorldCharacter
