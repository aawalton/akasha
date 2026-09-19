import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lim = {
  id: "01a0b70b-84ef-7992-892c-01ed7c8eeed3",
  type: "page-type/world-character",
  slug: "lim",
  title: "Lim",
  world: "world/the-wandering-inn",
  firstChapter: 130,
  lastChapter: 131,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
