import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const crimshaw = {
  id: "01a0b70a-0985-75ec-b1c4-8228a195fbb6",
  type: "page-type/world-character",
  slug: "crimshaw",
  title: "Crimshaw",
  world: "world/the-wandering-inn",
  firstChapter: 516,
  lastChapter: 764,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
