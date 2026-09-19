import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sirKerrig = {
  id: "01a0b70d-01d8-71d0-990f-82af37c372e2",
  type: "page-type/world-character",
  slug: "sir-kerrig",
  title: "Sir Kerrig",
  world: "world/the-wandering-inn",
  firstChapter: 263,
  lastChapter: 272,
  characterClaims: "jsonl",
  aliasOf: "world-character/sir-kerrig-louis",
} as const satisfies WorldCharacter
