import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cirille = {
  id: "01a0b70a-0187-7eb2-9681-f13806daf368",
  type: "page-type/world-character",
  slug: "cirille",
  title: "Commander Cirille",
  world: "world/the-wandering-inn",
  firstChapter: 438,
  lastChapter: 439,
  characterClaims: "jsonl",
  aliasOf: "world-character/cirille-bitterclaw",
} as const satisfies WorldCharacter
