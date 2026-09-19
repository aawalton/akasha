import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const princessErille = {
  id: "01a0b70c-74c6-7094-abd8-97bd54791fde",
  type: "page-type/world-character",
  slug: "princess-erille",
  title: "Erille",
  world: "world/the-wandering-inn",
  firstChapter: 216,
  lastChapter: 216,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
