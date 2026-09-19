import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyIeka = {
  id: "01a0b70b-739e-77a1-b0a3-0c97efd4e568",
  type: "page-type/world-character",
  slug: "lady-ieka",
  title: "Ieka",
  world: "world/the-wandering-inn",
  firstChapter: 271,
  lastChapter: 271,
  characterClaims: "jsonl",
  aliasOf: "world-character/ieka-imarris",
} as const satisfies WorldCharacter
