import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const russellTMorgan = {
  id: "01a06580-2495-704d-9bd3-cedce478c8e7",
  type: "page-type/world-character",
  slug: "russell-t-morgan",
  title: "Russell T. Morgan",
  world: "world/the-wandering-inn",
  maxLevel: 16,
  eventCount: 3,
  firstChapter: 816,
  lastChapter: 816,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
