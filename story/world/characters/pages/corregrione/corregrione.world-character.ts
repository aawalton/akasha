import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const corregrione = {
  id: "01a0b70a-0861-7a8a-be6d-a228a6bd0cb3",
  type: "page-type/world-character",
  slug: "corregrione",
  title: "Corregrione",
  world: "world/the-wandering-inn",
  firstChapter: 711,
  lastChapter: 711,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
