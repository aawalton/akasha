import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const alevica = {
  id: "01a06580-2493-7cc3-ab41-6c7dd177bc8b",
  type: "page-type/world-character",
  slug: "alevica",
  title: "Alevica",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 8,
  firstChapter: 349,
  lastChapter: 746,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
