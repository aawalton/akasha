import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chole = {
  id: "01a0b709-ff44-7e45-8055-9e3e4564e255",
  type: "page-type/world-character",
  slug: "chole",
  title: "Chole",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 215,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
