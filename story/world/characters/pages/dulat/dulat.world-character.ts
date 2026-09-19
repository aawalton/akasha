import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dulat = {
  id: "01a0b70a-1f03-7987-82a8-cb9bb2cad301",
  type: "page-type/world-character",
  slug: "dulat",
  title: "Dulat",
  world: "world/the-wandering-inn",
  firstChapter: 729,
  lastChapter: 764,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
