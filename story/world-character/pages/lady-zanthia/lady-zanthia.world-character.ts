import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyZanthia = {
  id: "01a0b70b-766a-76f4-bc92-a6d3d3ccaa44",
  type: "page-type/world-character",
  slug: "lady-zanthia",
  title: "Zanthia",
  world: "world/the-wandering-inn",
  firstChapter: 338,
  lastChapter: 416,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
