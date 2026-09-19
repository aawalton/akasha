import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const apista = {
  id: "01a06580-2493-77e2-a84d-1ac18472ba25",
  type: "page-type/world-character",
  slug: "apista",
  title: "Apista",
  world: "world/the-wandering-inn",
  eventCount: 2,
  firstChapter: 227,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
