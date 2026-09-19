import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const brunkr = {
  id: "01a0b707-8a5e-7d3e-8c1a-2406cb4406c7",
  type: "page-type/world-character",
  slug: "brunkr",
  title: "Brunkr",
  world: "world/the-wandering-inn",
  firstChapter: 95,
  lastChapter: 747,
  characterClaims: "jsonl",
  aliasOf: "world-character/brunkr-silverfang",
} as const satisfies WorldCharacter
