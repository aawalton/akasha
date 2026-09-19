import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lyon = {
  id: "01a0b706-d7c7-760a-8289-3cbc51346ec7",
  type: "page-type/world-character",
  slug: "lyon",
  title: "Lyon",
  world: "world/the-wandering-inn",
  firstChapter: 104,
  lastChapter: 104,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
