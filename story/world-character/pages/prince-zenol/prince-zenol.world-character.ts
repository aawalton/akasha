import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const princeZenol = {
  id: "01a0b70c-7421-71d8-bb18-67b2c52185a1",
  type: "page-type/world-character",
  slug: "prince-zenol",
  title: "Prince Zenol",
  world: "world/the-wandering-inn",
  firstChapter: 797,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
