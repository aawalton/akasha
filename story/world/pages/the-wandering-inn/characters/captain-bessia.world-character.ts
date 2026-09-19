import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const captainBessia = {
  id: "01a0b707-91f5-7181-be41-64c0d8afad4a",
  type: "page-type/world-character",
  slug: "captain-bessia",
  title: "Bessia",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
