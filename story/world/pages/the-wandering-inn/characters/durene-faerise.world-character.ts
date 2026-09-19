import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dureneFaerise = {
  id: "01a06580-2494-7ac1-929a-68dcb51fec94",
  type: "page-type/world-character",
  slug: "durene-faerise",
  title: "Durene Faerise",
  world: "world/the-wandering-inn",
  maxLevel: 3,
  eventCount: 5,
  firstChapter: 713,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
