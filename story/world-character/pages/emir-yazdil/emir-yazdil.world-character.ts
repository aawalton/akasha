import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const emirYazdil = {
  id: "01a0b70a-6bd0-7c49-b5cf-d7b0b03531b4",
  type: "page-type/world-character",
  slug: "emir-yazdil",
  title: "Emir Yazdil",
  world: "world/the-wandering-inn",
  firstChapter: 487,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
