import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const erek = {
  id: "01a0b70a-6e41-72cb-ae8f-53e7e093c659",
  type: "page-type/world-character",
  slug: "erek",
  title: "Erek",
  world: "world/the-wandering-inn",
  firstChapter: 776,
  lastChapter: 776,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
