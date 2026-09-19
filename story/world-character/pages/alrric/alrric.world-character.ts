import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alrric = {
  id: "01a0b707-6a95-7ffa-bdc5-28aeac0e8980",
  type: "page-type/world-character",
  slug: "alrric",
  title: "Alrric",
  world: "world/the-wandering-inn",
  firstChapter: 436,
  lastChapter: 494,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
