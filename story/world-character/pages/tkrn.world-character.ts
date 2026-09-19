import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tkrn = {
  id: "01a06580-2495-7ca0-a021-aa66911c1a42",
  type: "page-type/world-character",
  slug: "tkrn",
  title: "Tkrn",
  world: "world/the-wandering-inn",
  maxLevel: 21,
  eventCount: 6,
  firstChapter: 49,
  lastChapter: 711,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
