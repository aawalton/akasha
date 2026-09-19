import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const elenaOthonos = {
  id: "01a0b70a-275c-7129-8595-52f205cc35d7",
  type: "page-type/world-character",
  slug: "elena-othonos",
  title: "Elena Othonos",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 704,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
