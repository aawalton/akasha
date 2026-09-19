import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const comigenTerland = {
  id: "01a0b70a-0650-75eb-b2b0-4db6570f1882",
  type: "page-type/world-character",
  slug: "comigen-terland",
  title: "Comigen",
  world: "world/the-wandering-inn",
  firstChapter: 768,
  lastChapter: 768,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
