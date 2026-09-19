import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thirdMind = {
  id: "01a0b70d-2650-76d5-9f5c-91c9b349608c",
  type: "page-type/world-character",
  slug: "third-mind",
  title: "Third Mind",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
