import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tulmTheMithril = {
  id: "01a0b70d-7476-7926-8a52-f5976035e3ab",
  type: "page-type/world-character",
  slug: "tulm-the-mithril",
  title: "Tulm",
  world: "world/the-wandering-inn",
  firstChapter: 333,
  lastChapter: 576,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
