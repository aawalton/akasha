import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const thriss = {
  id: "01a0b70d-63d2-7794-b219-8acff13be7f0",
  type: "page-type/world-character",
  slug: "thriss",
  title: "Thriss",
  world: "world/the-wandering-inn",
  firstChapter: 130,
  lastChapter: 131,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
