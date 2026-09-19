import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ushar = {
  id: "01a0b70d-82c1-76f6-9d70-3c2b4f2a5417",
  type: "page-type/world-character",
  slug: "ushar",
  title: "Ushar",
  world: "world/the-wandering-inn",
  firstChapter: 707,
  lastChapter: 707,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
