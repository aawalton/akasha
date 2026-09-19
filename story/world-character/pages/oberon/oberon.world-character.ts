import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const oberon = {
  id: "01a0b70c-13a5-7f8d-a189-efadd1aa9788",
  type: "page-type/world-character",
  slug: "oberon",
  title: "Oberon",
  world: "world/the-wandering-inn",
  firstChapter: 533,
  lastChapter: 681,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
