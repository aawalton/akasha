import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const meisa = {
  id: "01a0b70b-e492-7bd3-bba1-3188479e7ccd",
  type: "page-type/world-character",
  slug: "meisa",
  title: "Dame Meisa",
  world: "world/the-wandering-inn",
  firstChapter: 608,
  lastChapter: 648,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
