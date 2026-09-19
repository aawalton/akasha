import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const beton = {
  id: "01a0b707-8334-79ff-9b0e-8814211ba0ab",
  type: "page-type/world-character",
  slug: "beton",
  title: "Beton",
  world: "world/the-wandering-inn",
  firstChapter: 549,
  lastChapter: 549,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
