import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const azkrash = {
  id: "01a0b707-779c-75a0-84d6-aa1d3135365e",
  type: "page-type/world-character",
  slug: "azkrash",
  title: "Az'kerash",
  world: "world/the-wandering-inn",
  firstChapter: 309,
  lastChapter: 309,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
