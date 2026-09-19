import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const safry = {
  id: "01a0b70c-a719-7c54-be8f-a9fa48590344",
  type: "page-type/world-character",
  slug: "safry",
  title: "Safry",
  world: "world/the-wandering-inn",
  firstChapter: 189,
  lastChapter: 192,
  characterClaims: "jsonl",
  aliasOf: "world-character/safry-maran",
} as const satisfies WorldCharacter
