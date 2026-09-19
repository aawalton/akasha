import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const richard = {
  id: "01a0b70c-96ee-7648-b591-8432e0c5d8c7",
  type: "page-type/world-character",
  slug: "richard",
  title: "Richard",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 438,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
