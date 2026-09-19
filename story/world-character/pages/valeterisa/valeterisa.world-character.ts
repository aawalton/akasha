import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const valeterisa = {
  id: "01a06580-2495-760b-8c88-7ed4d37e1fd8",
  type: "page-type/world-character",
  slug: "valeterisa",
  title: "Valeterisa",
  world: "world/the-wandering-inn",
  maxLevel: 54,
  eventCount: 4,
  firstChapter: 449,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
