import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const purpleSmile = {
  id: "01a0b70c-76f8-7fa1-a230-435547731029",
  type: "page-type/world-character",
  slug: "purple-smile",
  title: "Purple Smile",
  world: "world/the-wandering-inn",
  firstChapter: 226,
  lastChapter: 267,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
