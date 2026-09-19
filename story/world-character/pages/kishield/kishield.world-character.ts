import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kishield = {
  id: "01a0b70b-6d27-7e45-a39a-221a71881457",
  type: "page-type/world-character",
  slug: "kishield",
  title: "Kishield",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 345,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
