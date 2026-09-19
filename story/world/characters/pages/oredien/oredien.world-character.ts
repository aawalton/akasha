import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const oredien = {
  id: "01a0b70c-19cb-7240-9e38-eb9def608f15",
  type: "page-type/world-character",
  slug: "oredien",
  title: "Oredien",
  world: "world/the-wandering-inn",
  firstChapter: 546,
  lastChapter: 546,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
