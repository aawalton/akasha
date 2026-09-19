import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const petriaTerland = {
  id: "01a0b70c-694c-7e89-b600-636cdcd4ef45",
  type: "page-type/world-character",
  slug: "petria-terland",
  title: "Petria Terland",
  world: "world/the-wandering-inn",
  firstChapter: 820,
  lastChapter: 820,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
