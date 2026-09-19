import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sacra = {
  id: "01a0b70c-a6aa-71aa-b8e0-91abdda46e59",
  type: "page-type/world-character",
  slug: "sacra",
  title: "the spy",
  world: "world/the-wandering-inn",
  firstChapter: 205,
  lastChapter: 262,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
