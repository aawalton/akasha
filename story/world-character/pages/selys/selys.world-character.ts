import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const selys = {
  id: "01a0b70c-f0a2-7e81-8df7-a1719a872c39",
  type: "page-type/world-character",
  slug: "selys",
  title: "Selys",
  world: "world/the-wandering-inn",
  firstChapter: 23,
  lastChapter: 672,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
