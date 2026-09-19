import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const roseRoseblush = {
  id: "01a0b70c-9f0e-7e9e-a6f1-68ef11c42916",
  type: "page-type/world-character",
  slug: "rose-roseblush",
  title: "Rose",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
