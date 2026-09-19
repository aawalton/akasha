import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pewerthe = {
  id: "01a0b70c-6982-73df-824d-adc33f1772d0",
  type: "page-type/world-character",
  slug: "pewerthe",
  title: "Pewerthe",
  world: "world/the-wandering-inn",
  firstChapter: 624,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
