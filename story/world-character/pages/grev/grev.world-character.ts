import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const grev = {
  id: "01a0b70a-ea49-79b0-81af-32f35b1d8ff0",
  type: "page-type/world-character",
  slug: "grev",
  title: "Grev",
  world: "world/the-wandering-inn",
  firstChapter: 119,
  lastChapter: 413,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
