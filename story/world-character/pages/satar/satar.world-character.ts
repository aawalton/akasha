import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const satar = {
  id: "01a06580-2495-7036-95a2-fadb68f43e24",
  type: "page-type/world-character",
  slug: "satar",
  title: "Satar",
  world: "world/the-wandering-inn",
  maxLevel: 25,
  eventCount: 10,
  firstChapter: 564,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
