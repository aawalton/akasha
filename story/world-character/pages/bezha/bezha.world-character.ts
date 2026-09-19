import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bezha = {
  id: "01a0b707-84a1-70c3-8f95-8276d63e0f59",
  type: "page-type/world-character",
  slug: "bezha",
  title: "Bezhavil",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 324,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
