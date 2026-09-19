import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ximenes = {
  id: "01a0b70d-a476-7240-9457-a040e8c5ff8b",
  type: "page-type/world-character",
  slug: "ximenes",
  title: "Ximenes",
  world: "world/the-wandering-inn",
  firstChapter: 436,
  lastChapter: 436,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
