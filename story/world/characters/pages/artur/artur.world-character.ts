import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const artur = {
  id: "01a06580-2493-743d-badb-3f9020377317",
  type: "page-type/world-character",
  slug: "artur",
  title: "Artur",
  world: "world/the-wandering-inn",
  maxLevel: 17,
  eventCount: 11,
  firstChapter: 562,
  lastChapter: 605,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
