import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const antiniumQueen = {
  id: "01a0b707-6f51-7102-aa49-117e493fb30f",
  type: "page-type/world-character",
  slug: "antinium-queen",
  title: "the Queen of the Antinium",
  world: "world/the-wandering-inn",
  firstChapter: 33,
  lastChapter: 40,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
