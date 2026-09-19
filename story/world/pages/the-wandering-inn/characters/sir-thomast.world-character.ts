import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sirThomast = {
  id: "01a0b70d-02ed-7861-bb0b-f7da901ea0f0",
  type: "page-type/world-character",
  slug: "sir-thomast",
  title: "Sir Thomast",
  world: "world/the-wandering-inn",
  firstChapter: 251,
  lastChapter: 263,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
