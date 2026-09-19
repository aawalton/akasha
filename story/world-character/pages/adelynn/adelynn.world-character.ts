import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const adelynn = {
  id: "01a0b707-600c-7448-bbc5-55770a299f5f",
  type: "page-type/world-character",
  slug: "adelynn",
  title: "Adelynn",
  world: "world/the-wandering-inn",
  firstChapter: 151,
  lastChapter: 151,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
