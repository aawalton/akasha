import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const venazHammerad = {
  id: "01a0b70d-8d9b-7319-9494-c773fa37ed65",
  type: "page-type/world-character",
  slug: "venaz-hammerad",
  title: "Venaz",
  world: "world/the-wandering-inn",
  firstChapter: 418,
  lastChapter: 418,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
