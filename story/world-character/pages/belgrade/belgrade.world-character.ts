import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const belgrade = {
  id: "01a06580-2494-7cdd-accf-63dafbc69ed4",
  type: "page-type/world-character",
  slug: "belgrade",
  title: "Belgrade",
  world: "world/the-wandering-inn",
  maxLevel: 33,
  eventCount: 5,
  firstChapter: 147,
  lastChapter: 562,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
