import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const coroise = {
  id: "01a0b70a-082d-71e4-9c01-c2032d5df806",
  type: "page-type/world-character",
  slug: "coroise",
  title: "Coroise",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
