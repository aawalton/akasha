import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const highMageTelim = {
  id: "01a0b70a-fcb6-74cf-9974-0bd55fd1e2c1",
  type: "page-type/world-character",
  slug: "high-mage-telim",
  title: "High Mage Telim",
  world: "world/the-wandering-inn",
  firstChapter: 556,
  lastChapter: 556,
  characterClaims: "jsonl",
  aliasOf: "world-character/telim",
} as const satisfies WorldCharacter
