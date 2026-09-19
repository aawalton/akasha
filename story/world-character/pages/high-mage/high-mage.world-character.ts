import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const highMage = {
  id: "01a0b70a-fc03-73a9-9790-804bc86c64fd",
  type: "page-type/world-character",
  slug: "high-mage",
  title: "the High Mage",
  world: "world/the-wandering-inn",
  firstChapter: 12,
  lastChapter: 12,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
