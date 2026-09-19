import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const snatcher = {
  id: "01a0b70d-07c5-7720-af15-410f7cf2d3b8",
  type: "page-type/world-character",
  slug: "snatcher",
  title: "Snatcher",
  world: "world/the-wandering-inn",
  firstChapter: 284,
  lastChapter: 284,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
