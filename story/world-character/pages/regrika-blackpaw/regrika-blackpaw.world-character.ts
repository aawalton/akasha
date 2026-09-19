import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const regrikaBlackpaw = {
  id: "01a0b70c-8bba-787b-9676-db08011ed111",
  type: "page-type/world-character",
  slug: "regrika-blackpaw",
  title: "Regrika Blackpaw",
  world: "world/the-wandering-inn",
  firstChapter: 208,
  lastChapter: 322,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
