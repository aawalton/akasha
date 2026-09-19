import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const stenei = {
  id: "01a0b70d-0eb0-7a20-ad1a-01d1117f55ae",
  type: "page-type/world-character",
  slug: "stenei",
  title: "Stenei",
  world: "world/the-wandering-inn",
  firstChapter: 42,
  lastChapter: 42,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
