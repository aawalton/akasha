import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const remiCanada = {
  id: "01a0b70c-9017-7ec5-adf6-869c2df4d0ae",
  type: "page-type/world-character",
  slug: "remi-canada",
  title: "Rémi Canada",
  world: "world/the-wandering-inn",
  firstChapter: 368,
  lastChapter: 688,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
