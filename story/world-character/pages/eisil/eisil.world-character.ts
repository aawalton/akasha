import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eisil = {
  id: "01a0b70a-241f-7729-adf8-7cc027ad9967",
  type: "page-type/world-character",
  slug: "eisil",
  title: "Eisil",
  world: "world/the-wandering-inn",
  firstChapter: 805,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
