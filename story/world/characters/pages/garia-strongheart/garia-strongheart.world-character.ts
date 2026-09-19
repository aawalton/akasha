import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gariaStrongheart = {
  id: "01a0b70a-91b0-704d-ad66-81ed0990b9ad",
  type: "page-type/world-character",
  slug: "garia-strongheart",
  title: "Garia Strongheart",
  world: "world/the-wandering-inn",
  firstChapter: 22,
  lastChapter: 627,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
