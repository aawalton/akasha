import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xolOfIngrilt = {
  id: "01a0b70d-d810-7baa-ad6d-d7987c16ab6e",
  type: "page-type/world-character",
  slug: "xol-of-ingrilt",
  title: "Xol of Ingrilt",
  world: "world/the-wandering-inn",
  firstChapter: 576,
  lastChapter: 576,
  characterClaims: "jsonl",
  aliasOf: "world-character/xol",
} as const satisfies WorldCharacter
