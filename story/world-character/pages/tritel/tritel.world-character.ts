import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tritel = {
  id: "01a0b70d-7220-7f3a-b118-fee57902494f",
  type: "page-type/world-character",
  slug: "tritel",
  title: "Tritel",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 474,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
