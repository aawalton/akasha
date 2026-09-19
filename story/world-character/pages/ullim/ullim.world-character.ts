import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ullim = {
  id: "01a0b70d-7e1f-74c3-88a4-b6122448c625",
  type: "page-type/world-character",
  slug: "ullim",
  title: "Ullim",
  world: "world/the-wandering-inn",
  firstChapter: 361,
  lastChapter: 361,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
