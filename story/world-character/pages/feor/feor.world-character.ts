import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const feor = {
  id: "01a0b70a-805f-73d3-86d8-c011b580b4bb",
  type: "page-type/world-character",
  slug: "feor",
  title: "Feor",
  world: "world/the-wandering-inn",
  firstChapter: 162,
  lastChapter: 771,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
