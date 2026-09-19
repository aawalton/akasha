import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wetar = {
  id: "01a0b70d-9d3d-7b82-90e8-013f33b4e277",
  type: "page-type/world-character",
  slug: "wetar",
  title: "Wetar",
  world: "world/the-wandering-inn",
  firstChapter: 770,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
