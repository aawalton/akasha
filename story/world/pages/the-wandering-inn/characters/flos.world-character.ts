import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const flos = {
  id: "01a0b70a-8a43-71a0-ac8d-4908956d29f2",
  type: "page-type/world-character",
  slug: "flos",
  title: "twinTrouble_53",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 705,
  characterClaims: "jsonl",
  aliasOf: "world-character/flos-reimarch",
} as const satisfies WorldCharacter
