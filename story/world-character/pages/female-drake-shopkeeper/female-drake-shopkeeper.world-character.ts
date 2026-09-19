import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const femaleDrakeShopkeeper = {
  id: "01a0b70a-7e21-7c0a-a84a-5a0dff1deee4",
  type: "page-type/world-character",
  slug: "female-drake-shopkeeper",
  title: "female Drake jewelry seller",
  world: "world/the-wandering-inn",
  firstChapter: 19,
  lastChapter: 19,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
