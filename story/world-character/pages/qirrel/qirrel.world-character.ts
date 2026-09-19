import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const qirrel = {
  id: "01a0b70c-779d-7ee3-ac15-9ea6cf2c67d6",
  type: "page-type/world-character",
  slug: "qirrel",
  title: "Qirrel",
  world: "world/the-wandering-inn",
  firstChapter: 806,
  lastChapter: 806,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
