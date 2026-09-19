import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const baronRegalius = {
  id: "01a0b707-7b56-7df2-8f04-b6b9d6d39bad",
  type: "page-type/world-character",
  slug: "baron-regalius",
  title: "Baron Regalius du Ecte",
  world: "world/the-wandering-inn",
  firstChapter: 527,
  lastChapter: 533,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
