import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alkedFellbow = {
  id: "01a0b707-69f4-7969-8fcf-e79d13cbc3ac",
  type: "page-type/world-character",
  slug: "alked-fellbow",
  title: "Alked Fellbow",
  world: "world/the-wandering-inn",
  firstChapter: 624,
  lastChapter: 806,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
