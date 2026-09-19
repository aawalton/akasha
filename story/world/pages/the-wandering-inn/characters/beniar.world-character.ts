import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beniar = {
  id: "01a0b707-80db-706c-b114-de345e2faf14",
  type: "page-type/world-character",
  slug: "beniar",
  title: "Beniar",
  world: "world/the-wandering-inn",
  firstChapter: 202,
  lastChapter: 355,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
