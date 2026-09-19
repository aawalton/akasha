import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jeiss = {
  id: "01a0b70b-1c43-734e-80ca-ba0031d2757f",
  type: "page-type/world-character",
  slug: "jeiss",
  title: "Jeiss",
  world: "world/the-wandering-inn",
  firstChapter: 31,
  lastChapter: 389,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
