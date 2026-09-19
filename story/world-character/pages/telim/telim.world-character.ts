import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const telim = {
  id: "01a0b70d-1486-7de7-8073-0e2c143800a6",
  type: "page-type/world-character",
  slug: "telim",
  title: "Telim",
  world: "world/the-wandering-inn",
  firstChapter: 557,
  lastChapter: 771,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
