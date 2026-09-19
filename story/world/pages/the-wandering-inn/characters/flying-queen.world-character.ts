import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const flyingQueen = {
  id: "01a0b70a-8ab2-79a9-92d0-88c8dd46c45a",
  type: "page-type/world-character",
  slug: "flying-queen",
  title: "Flying Queen",
  world: "world/the-wandering-inn",
  firstChapter: 394,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
