import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rags = {
  id: "01a06580-2495-718b-aeda-9badee68b180",
  type: "page-type/world-character",
  slug: "rags",
  title: "Rags",
  world: "world/the-wandering-inn",
  maxLevel: 35,
  eventCount: 27,
  firstChapter: 28,
  lastChapter: 754,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
