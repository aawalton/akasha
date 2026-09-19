import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const errifJealwind = {
  id: "01a0b70a-7332-78d2-8c4a-3e0130fad28f",
  type: "page-type/world-character",
  slug: "errif-jealwind",
  title: "Errif Jealwind",
  world: "world/the-wandering-inn",
  firstChapter: 241,
  lastChapter: 241,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
