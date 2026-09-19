import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const highMageMerzun = {
  id: "01a0b70a-fc7b-78ec-9b40-e4c248cda8ec",
  type: "page-type/world-character",
  slug: "high-mage-merzun",
  title: "Merzun",
  world: "world/the-wandering-inn",
  firstChapter: 499,
  lastChapter: 499,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
