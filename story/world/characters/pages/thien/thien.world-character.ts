import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const thien = {
  id: "01a0b70d-25de-70fc-b791-89ca781c99fe",
  type: "page-type/world-character",
  slug: "thien",
  title: "Thien",
  world: "world/the-wandering-inn",
  firstChapter: 777,
  lastChapter: 777,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
