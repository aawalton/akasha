import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const raeltLeysars = {
  id: "01a06580-2495-7662-9759-276a2ab14800",
  type: "page-type/world-character",
  slug: "raelt-leysars",
  title: "Raelt Leysars",
  world: "world/the-wandering-inn",
  maxLevel: 35,
  eventCount: 10,
  firstChapter: 410,
  lastChapter: 453,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
