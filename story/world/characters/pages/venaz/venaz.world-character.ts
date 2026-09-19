import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const venaz = {
  id: "01a06580-2495-7cb0-b614-b7d1c864788f",
  type: "page-type/world-character",
  slug: "venaz",
  title: "Venaz",
  world: "world/the-wandering-inn",
  eventCount: 1,
  firstChapter: 111,
  lastChapter: 802,
  characterClaims: "jsonl",
  aliasOf: "world-character/venaz-hammerad",
} as const satisfies WorldCharacter
