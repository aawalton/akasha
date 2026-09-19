import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gnollShopkeeper = {
  id: "01a0b70a-a0a2-7bfa-bdde-351604181bb9",
  type: "page-type/world-character",
  slug: "gnoll-shopkeeper",
  title: "tall Gnoll shopkeeper",
  world: "world/the-wandering-inn",
  firstChapter: 19,
  lastChapter: 19,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
