import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const valceifGodfrey = {
  id: "01a0b70d-84c6-7e8d-b151-1f6a073c151c",
  type: "page-type/world-character",
  slug: "valceif-godfrey",
  title: "Valceif Godfrey",
  world: "world/the-wandering-inn",
  firstChapter: 85,
  lastChapter: 762,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
