import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const viltach = {
  id: "01a0b70d-9405-73b3-9b41-7daa833fe2bb",
  type: "page-type/world-character",
  slug: "viltach",
  title: "Viltach",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 558,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
