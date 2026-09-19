import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const telimHighMage = {
  id: "01a0b70d-14bd-7dd6-a8ad-fe4e55fdabb6",
  type: "page-type/world-character",
  slug: "telim-high-mage",
  title: "High Mage Telim",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
  aliasOf: "world-character/telim",
} as const satisfies WorldCharacter
