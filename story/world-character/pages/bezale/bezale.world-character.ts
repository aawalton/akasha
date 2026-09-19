import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bezale = {
  id: "01a0b707-846b-78ed-80f9-82200b5125e9",
  type: "page-type/world-character",
  slug: "bezale",
  title: "Bezale",
  world: "world/the-wandering-inn",
  firstChapter: 379,
  lastChapter: 746,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
