import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nollesc = {
  id: "01a06580-2495-7e91-b1f3-1597b175ac2f",
  type: "page-type/world-character",
  slug: "nollesc",
  title: "Nollesc",
  world: "world/the-wandering-inn",
  maxLevel: 31,
  eventCount: 1,
  firstChapter: 668,
  lastChapter: 668,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
