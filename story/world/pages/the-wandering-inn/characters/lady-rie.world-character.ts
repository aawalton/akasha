import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyRie = {
  id: "01a0b70b-74eb-76a4-96c2-67f156245406",
  type: "page-type/world-character",
  slug: "lady-rie",
  title: "Rie Valerund",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 221,
  lastChapter: 463,
  characterClaims: "jsonl",
  aliasOf: "world-character/lady-rie-valerund",
} as const satisfies WorldCharacter
