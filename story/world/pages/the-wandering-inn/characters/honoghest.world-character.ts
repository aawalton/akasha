import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const honoghest = {
  id: "01a0b70a-ff9d-7312-b112-f1574a176413",
  type: "page-type/world-character",
  slug: "honoghest",
  title: "Honoghest",
  world: "world/the-wandering-inn",
  firstChapter: 806,
  lastChapter: 806,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
