import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const torrebTheUndefeated = {
  id: "01a0b70d-6ed7-7808-9607-ec4d01bf9aa7",
  type: "page-type/world-character",
  slug: "torreb-the-undefeated",
  title: "Torreb",
  world: "world/the-wandering-inn",
  firstChapter: 638,
  lastChapter: 638,
  characterClaims: "jsonl",
  aliasOf: "world-character/torreb",
} as const satisfies WorldCharacter
