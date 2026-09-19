import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const snapjaw = {
  id: "01a06580-2495-72da-aa73-4c4e3caf741d",
  type: "page-type/world-character",
  slug: "snapjaw",
  title: "Snapjaw",
  world: "world/the-wandering-inn",
  maxLevel: 31,
  eventCount: 7,
  firstChapter: 232,
  lastChapter: 718,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
