import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eddy = {
  id: "01a0b70a-22e5-7066-87f1-95431123f518",
  type: "page-type/world-character",
  slug: "eddy",
  title: "Eddy",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 215,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
