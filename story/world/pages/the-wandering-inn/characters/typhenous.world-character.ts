import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const typhenous = {
  id: "01a06580-2495-7777-b055-2c5cc0746f9e",
  type: "page-type/world-character",
  slug: "typhenous",
  title: "Typhenous",
  world: "world/the-wandering-inn",
  maxLevel: 28,
  eventCount: 2,
  firstChapter: 94,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
