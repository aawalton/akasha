import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulyse = {
  id: "01a0b70d-811d-78d6-bcd4-ad2654c686cb",
  type: "page-type/world-character",
  slug: "ulyse",
  title: "Ulyse",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 410,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
