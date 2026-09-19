import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const teriarchEldavin = {
  id: "01a0b70d-185c-7bff-8359-4b12b3c8f2e6",
  type: "page-type/world-character",
  slug: "teriarch-eldavin",
  title: "Eldavin",
  world: "world/the-wandering-inn",
  firstChapter: 434,
  lastChapter: 488,
  characterClaims: "jsonl",
  aliasOf: "world-character/teriarch",
} as const satisfies WorldCharacter
