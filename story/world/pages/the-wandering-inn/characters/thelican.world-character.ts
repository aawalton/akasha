import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const thelican = {
  id: "01a0b70d-2317-76f6-8712-bb87a35c84d2",
  type: "page-type/world-character",
  slug: "thelican",
  title: "Thelican",
  world: "world/the-wandering-inn",
  firstChapter: 370,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
