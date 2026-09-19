import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const krshiaSilverfang = {
  id: "01a0b70b-6f44-7f73-b640-dfebad9aac73",
  type: "page-type/world-character",
  slug: "krshia-silverfang",
  title: "Krshia Silverfang",
  world: "world/the-wandering-inn",
  firstChapter: 14,
  lastChapter: 578,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
