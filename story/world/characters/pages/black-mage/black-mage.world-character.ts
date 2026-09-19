import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blackMage = {
  id: "01a0b707-8668-7607-ac56-8e4f35bc3a8c",
  type: "page-type/world-character",
  slug: "black-mage",
  title: "BlackMage",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
