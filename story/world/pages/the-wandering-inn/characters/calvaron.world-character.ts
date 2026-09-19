import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calvaron = {
  id: "01a0b707-90f0-7b6f-9672-27741017af8a",
  type: "page-type/world-character",
  slug: "calvaron",
  title: "Calvaron",
  world: "world/the-wandering-inn",
  firstChapter: 158,
  lastChapter: 164,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
