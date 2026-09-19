import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const iekaImarris = {
  id: "01a0b70b-03ec-702f-bb1c-a90b0da82084",
  type: "page-type/world-character",
  slug: "ieka-imarris",
  title: "Ieka Imarris",
  world: "world/the-wandering-inn",
  firstChapter: 430,
  lastChapter: 664,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
