import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const queenMarquin = {
  id: "01a0b70c-7ab3-7b7a-929a-75e65c65be69",
  type: "page-type/world-character",
  slug: "queen-marquin",
  title: "Marquin",
  world: "world/the-wandering-inn",
  firstChapter: 583,
  lastChapter: 757,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
