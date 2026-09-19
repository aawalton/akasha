import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ressa = {
  id: "01a0b70c-90fb-7ac4-9969-526d6d96e172",
  type: "page-type/world-character",
  slug: "ressa",
  title: "Ressa",
  world: "world/the-wandering-inn",
  firstChapter: 21,
  lastChapter: 812,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
