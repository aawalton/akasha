import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const todi = {
  id: "01a0b70d-68e5-79a5-a049-dca72d38c935",
  type: "page-type/world-character",
  slug: "todi",
  title: "Todi",
  world: "world/the-wandering-inn",
  firstChapter: 413,
  lastChapter: 413,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
