import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sevil = {
  id: "01a0b70c-fa01-73c5-bd55-0840f692971d",
  type: "page-type/world-character",
  slug: "sevil",
  title: "Sevil",
  world: "world/the-wandering-inn",
  firstChapter: 713,
  lastChapter: 714,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
