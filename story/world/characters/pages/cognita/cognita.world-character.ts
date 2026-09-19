import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cognita = {
  id: "01a0b70a-0400-7cf7-9f1a-0108f6fec8cf",
  type: "page-type/world-character",
  slug: "cognita",
  title: "Cognita",
  world: "world/the-wandering-inn",
  firstChapter: 158,
  lastChapter: 796,
  characterClaims: "jsonl",
  aliasOf: "world-character/cognita-truestone",
} as const satisfies WorldCharacter
