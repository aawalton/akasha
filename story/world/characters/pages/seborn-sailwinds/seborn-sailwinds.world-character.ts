import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sebornSailwinds = {
  id: "01a06580-2495-7d21-b595-52fa5638ccf5",
  type: "page-type/world-character",
  slug: "seborn-sailwinds",
  title: "Seborn Sailwinds",
  world: "world/the-wandering-inn",
  eventCount: 1,
  firstChapter: 401,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
