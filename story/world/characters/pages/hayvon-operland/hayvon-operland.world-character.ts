import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hayvonOperland = {
  id: "01a0b70a-f3e7-7072-8292-ecbcc2f4774e",
  type: "page-type/world-character",
  slug: "hayvon-operland",
  title: "Hayvon Operland",
  world: "world/the-wandering-inn",
  firstChapter: 387,
  lastChapter: 387,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
