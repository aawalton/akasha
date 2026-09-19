import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xeppal = {
  id: "01a0b70d-a2dd-7c4b-8d84-11ecef753691",
  type: "page-type/world-character",
  slug: "xeppal",
  title: "Xeppal",
  world: "world/the-wandering-inn",
  firstChapter: 411,
  lastChapter: 411,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
