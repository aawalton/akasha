import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bethal = {
  id: "01a0b707-8298-7d21-99e3-6ed6850923e0",
  type: "page-type/world-character",
  slug: "bethal",
  title: "Bethal",
  world: "world/the-wandering-inn",
  firstChapter: 183,
  lastChapter: 681,
  characterClaims: "jsonl",
  aliasOf: "world-character/bethal-walchais",
} as const satisfies WorldCharacter
