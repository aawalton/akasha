import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const riefel = {
  id: "01a0b70c-9858-7976-93cb-39917b818ee9",
  type: "page-type/world-character",
  slug: "riefel",
  title: "Emir Riefel",
  world: "world/the-wandering-inn",
  firstChapter: 242,
  lastChapter: 242,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
