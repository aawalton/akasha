import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const generalYerzhen = {
  id: "01a0b70a-96d2-7537-890a-6ce9fb0b6b1e",
  type: "page-type/world-character",
  slug: "general-yerzhen",
  title: "General Yerzhen",
  world: "world/the-wandering-inn",
  firstChapter: 471,
  lastChapter: 471,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
